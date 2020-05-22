import PopulationModel from '../../graphql/modules/population/PopulationModel';
import { getConnection, MONGO_URL } from '../../common';
import AlgorithmModel from '../../graphql/modules/algorithm/AlgorithmModel';
import { publishToQueue } from '../../common/aws';

const handleAvaliate = async event => {
  console.log('avaliate');
  try {
    const { populationId } = JSON.parse(event.Records[0].Sns.Message);

    const connection = await getConnection(MONGO_URL);
    const population = await PopulationModel(connection)
      .findById(populationId)
      .lean();

    const algorithm = await AlgorithmModel(connection)
      .findById(population.algorithm)
      .lean();

    const { testFunction } = algorithm?.setup;
    const fn = new Function('individual', testFunction);
    const fitness = fn(JSON.parse(population.fields));
    await PopulationModel(connection).findOneAndUpdate({ _id: population._id }, { fitness });

    const count = await PopulationModel(connection).countDocuments({
      fitness: { $ne: null },
      algorithm: algorithm._id,
    });

    const updatedAlgorithm = await AlgorithmModel(connection).findOne({ _id: algorithm._id });

    if (algorithm.setup.populationSize === count && !updatedAlgorithm.status.isSelecting) {
      const startTime = Date.now();
      await AlgorithmModel(connection).findOneAndUpdate(
        { _id: algorithm._id },
        { status: { ...algorithm.status, isSelecting: startTime } },
      );
      await publishToQueue('select', { algorithmId: population.algorithm, startTime });
    }
    await connection.close();
  } catch (e) {
    console.log(e);
  }
};

export default handleAvaliate;
