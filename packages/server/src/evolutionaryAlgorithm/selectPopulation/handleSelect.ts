import { getConnection, MONGO_URL } from '../../common';
import AlgorithmModel from '../../graphql/modules/algorithm/AlgorithmModel';
import PopulationModel from '../../graphql/modules/population/PopulationModel';
import tournamentSelection from './tournamentSelection';
import { publishToQueue } from '../../common/aws';
import LogModel from '../../graphql/modules/log/LogModel';
import mutateIndividual, { calculateGenerationsWithModifier, calculateMutationRateChange } from './mutateIndividual';
import { EVENTS, pubSub } from '../../common/subscriptions';

const MUTATE_COUNT_THRESHOLD = 4;

const calculatePopulationScore = async (connection, population, baseAlgorithm) => {
  const populationFitness = (
    await PopulationModel(connection).aggregate([{ $group: { _id: 'population', average: { $avg: '$fitness' } } }])
  )[0].average;

  const algorithm = await AlgorithmModel(connection)
    .findOneAndUpdate(
      { _id: population[0].algorithm, user: population[0].user },
      {
        currentData: {
          bestFitness: population[0].fitness,
          population: JSON.stringify(population),
        },
        evolveConfig: {
          ...baseAlgorithm.evolveConfig,
          generationsWithRateModifier: calculateGenerationsWithModifier(baseAlgorithm),
        },
      },
    )
    .lean();

  const newLog = await new (LogModel(connection))({
    populationFitness,
    fitness: population[0].fitness,
    user: population[0].user,
    algorithm: population[0].algorithm,
  }).save();

  await pubSub.publish(EVENTS.LOGS.NEW, { LogNew: { log: { id: newLog._id, ...newLog.toObject() } } });

  const count = await LogModel(connection).countDocuments({ fitness: population[0].fitness });
  if (count > MUTATE_COUNT_THRESHOLD) {
    await AlgorithmModel(connection)
      .findOneAndUpdate(
        { _id: population[0].algorithm, user: population[0].user },
        {
          evolveConfig: calculateMutationRateChange(algorithm),
        },
      )
      .lean();
  }
};

export const handleRestart = async (population, algorithm) => {
  for await (const individual of population) await publishToQueue('avaliate', { populationId: individual._id });
  await publishToQueue('select', { algorithmId: algorithm._id });
};

const handleSelect = async event => {
  try {
    console.log('select');
    const { algorithmId } = JSON.parse(event.Records[0].Sns.Message);
    const connection = await getConnection(MONGO_URL);
    const algorithm = await AlgorithmModel(connection)
      .findById(algorithmId)
      .lean();

    const count = await PopulationModel(connection).countDocuments({
      fitness: { $ne: null },
      algorithm: algorithm._id,
    });

    console.log(count, algorithm.setup.populationSize);

    if (!algorithm.status.isRunning) return;
    if (algorithm.setup.populationSize !== count) return await publishToQueue('select', { algorithmId });
    const population = await PopulationModel(connection)
      .find({
        algorithm: algorithm._id,
      })
      .sort({ fitness: -1 })
      .lean();

    await calculatePopulationScore(connection, population, algorithm);

    const { populationSize } = algorithm?.setup;

    const newPopulation = new Array(populationSize - 1).fill(null);
    const bestIndividual = population[0];

    for await (const [index] of newPopulation.entries()) {
      newPopulation[index] = await new (PopulationModel(connection))({
        algorithm: algorithm._id,
        user: algorithm.user._id,
        fields: JSON.stringify(mutateIndividual(tournamentSelection(population, bestIndividual, algorithm), algorithm)),
      });
    }

    await PopulationModel(connection).deleteMany({ fitness: { $ne: null } });

    for await (const [index] of newPopulation.entries()) {
      await newPopulation[index].save();
    }

    const newBestIndividual = await new (PopulationModel(connection))({
      algorithm: algorithm._id,
      user: algorithm.user._id,
      fields: bestIndividual.fields,
    }).save();

    if (algorithm.status.isRunning) await handleRestart([...newPopulation, newBestIndividual], algorithm);
  } catch (e) {
    console.log(e);
  }
};

export default handleSelect;
