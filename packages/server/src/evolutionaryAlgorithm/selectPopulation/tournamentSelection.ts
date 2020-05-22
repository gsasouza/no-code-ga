import { IPopulation } from '../../graphql/modules/population/PopulationModel';
import { IAlgorithm } from '../../graphql/modules/algorithm/AlgorithmModel';
import { FIELD_TYPES } from './fields';

const combat = (individualA, individualB) => (individualA.fitness > individualB.fitness ? individualA : individualB);

const calculateMean = (array, field) =>
  array.reduce((acc, cur) => acc + JSON.parse(cur.fields)[field], 0) / array.length;

const arrayToObject = array => array.reduce((acc, cur) => ({ ...acc, ...cur }), {});

const calculateFieldResult = (individuals: IPopulation[], algorithm: IAlgorithm) => {
  const { dataModel } = algorithm.setup;
  const fields = dataModel.map(field => {
    if (field.type === FIELD_TYPES.NUMBER) return { [field.name]: calculateMean(individuals, field.name) };
    return { [field.name]: 0 };
  });

  return arrayToObject(fields);
};

const tournamentSelection = (population: IPopulation[], bestResult: IPopulation, algorithm: IAlgorithm) => {
  const mother = combat(
    population[Math.floor(Math.random() * population.length)],
    population[Math.floor(Math.random() * population.length)],
  );

  const father = combat(
    population[Math.floor(Math.random() * population.length)],
    population[Math.floor(Math.random() * population.length)],
  );
  return calculateFieldResult([mother, father, bestResult], algorithm);
};

export default tournamentSelection;
