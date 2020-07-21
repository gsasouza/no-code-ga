import PopulationModel from '../../graphql/modules/population/PopulationModel';
import { getConnection, MONGO_URL } from '../../common';
import AlgorithmModel from '../../graphql/modules/algorithm/AlgorithmModel';

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
    const fn = new Function('individual', `${testFunction}; return avaliate(individual);`);
    const fitness = fn(JSON.parse(population.fields));
    console.log(fitness * 1000);
    await PopulationModel(connection).findOneAndUpdate({ _id: population._id }, { fitness });
  } catch (e) {
    console.log(e);
  }
};

export default handleAvaliate;
