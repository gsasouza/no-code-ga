import AlgorithmModel from '../../graphql/modules/algorithm/AlgorithmModel';
import { getConnection, MONGO_URL } from '../../common';

const setupCreate = async event => {
  const { body: { algorithmId } } = JSON.parse(event.Records[0].Sns.Message);

  const connection = await getConnection(MONGO_URL);
  console.log(algorithmId)
  const algorithm = AlgorithmModel(connection)
    .findById(algorithmId)
    .lean();
  const { populationSize = 100, generateFunction = 'return { value: position + 1 };' } = {}; // algorithm?.setup;
  const fn = new Function('position', generateFunction);
  const population = new Array(populationSize).fill(null).map((_, i) => fn(i));
  console.log(population);
  return {
    population,
  };
};

export default setupCreate;
