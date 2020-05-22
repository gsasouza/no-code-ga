import { getConnection, MONGO_URL } from '../../common';
import AlgorithmModel from '../../graphql/modules/algorithm/AlgorithmModel';
import PopulationModel from '../../graphql/modules/population/PopulationModel';
import tournamentSelection from './tournamentSelection';
import { publishToQueue } from '../../common/aws';
import LogModel from '../../graphql/modules/log/LogModel';

const calculatePopulationScore = async (connection, population) => {
  const populationFitness = (
    await PopulationModel(connection).aggregate([{ $group: { _id: 'population', average: { $avg: '$fitness' } } }])
  )[0].average;

  await AlgorithmModel(connection).findOneAndUpdate(
    { _id: population[0].algorithm, user: population[0].user },
    {
      currentData: {
        bestFitness: population[0].fitness,
        population: JSON.stringify(population),
      },
    },
  );

  return new (LogModel(connection))({
    populationFitness,
    fitness: population[0].fitness,
    user: population[0].user,
    algorithm: population[0].algorithm,
  }).save();
};

const handleRestart = async population => {
  for await (const individual of population) await publishToQueue('avaliate', { populationId: individual._id });
};

const handleSelect = async event => {
  try {
    const { algorithmId, startTime } = JSON.parse(event.Records[0].Sns.Message);
    const connection = await getConnection(MONGO_URL);
    const algorithm = await AlgorithmModel(connection)
      .findById(algorithmId)
      .lean();

    if (algorithm.status.isSelecting !== startTime) return;
    console.log('select');
    const population = await PopulationModel(connection)
      .find({
        algorithm: algorithm._id,
      })
      .sort({ fitness: -1 })
      .lean();

    await calculatePopulationScore(connection, population);

    const { populationSize } = algorithm?.setup;

    const newPopulation = new Array(populationSize - 1).fill(null);
    const bestIndividual = population[0];

    for await (const [index] of newPopulation.entries()) {
      newPopulation[index] = await new (PopulationModel(connection))({
        algorithm: algorithm._id,
        user: algorithm.user._id,
        fields: JSON.stringify(tournamentSelection(population, bestIndividual, algorithm)),
      }).save();
    }

    await PopulationModel(connection).deleteMany({ fitness: { $ne: null } });

    const newBestIndividual = await new (PopulationModel(connection))({
      algorithm: algorithm._id,
      user: algorithm.user._id,
      fields: bestIndividual.fields,
    }).save();

    const updatedAlgorithm = await AlgorithmModel(connection).findOneAndUpdate(
      { _id: algorithm._id },
      { status: { ...algorithm.status, isSelecting: 0 } },
    );

    if (updatedAlgorithm.status.isRunning) await handleRestart([...newPopulation, newBestIndividual]);

    await connection.close();
  } catch (e) {
    console.log(e);
  }
};

export default handleSelect;
