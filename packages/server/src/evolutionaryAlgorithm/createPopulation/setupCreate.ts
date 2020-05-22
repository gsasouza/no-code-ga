import AlgorithmModel from '../../graphql/modules/algorithm/AlgorithmModel';
import { getConnection, MONGO_URL } from '../../common';
import PopulationModel from '../../graphql/modules/population/PopulationModel';
import { publishToQueue } from '../../common/aws';
import LogModel from '../../graphql/modules/log/LogType';
const setupCreate = async event => {
  console.log('create');
  try {
    const { algorithmId } = JSON.parse(event.Records[0].Sns.Message);

    const connection = await getConnection(MONGO_URL);
    const algorithm = await AlgorithmModel(connection)
      .findById(algorithmId)
      .lean();

    const { populationSize, generateFunction } = algorithm?.setup;
    const fn = new Function('position', generateFunction);

    const population = new Array(populationSize).fill(null).map((_, i) => fn(i));
    await PopulationModel(connection).deleteMany({ algorithm: algorithm._id });
    await LogModel(connection).deleteMany({ algorithm: algorithm._id });

    for await (const individual of population) {
      const document = await new (PopulationModel(connection))({
        algorithm: algorithm._id,
        user: algorithm.user._id,
        fields: JSON.stringify(individual),
      }).save();
      await publishToQueue('avaliate', { populationId: document._id });
    }
    await connection.close();
  } catch (e) {
    console.log(e);
  }
};

export default setupCreate;
