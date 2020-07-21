import R from 'ramda';
import { IPopulation } from '../../graphql/modules/population/PopulationModel';
import { Field, IAlgorithm } from '../../graphql/modules/algorithm/AlgorithmModel';
import { FIELD_TYPES } from './fields';
import { randomIntBetween } from '../../common';

const combat = (individualA, individualB) => (individualA.fitness > individualB.fitness ? individualA : individualB);

const calculateMean = (array: IPopulation[], field: Field) =>
  array.reduce((acc, cur) => acc + JSON.parse(cur.fields)[field.name], 0) / array.length;

const getIndividualObject = (individual: IPopulation) => JSON.parse(individual.fields);

const generateTSPIndividual = (array, field) => {
  const bestResult = getIndividualObject(array[array.length - 1])[field.name];
  const father = getIndividualObject(array[0])[field.name];
  const citySize = bestResult.length;
  const start = randomIntBetween(0, citySize);
  const end = start + citySize/2;
  const bestResultPartition = bestResult.slice(start, end);
  const filteredFather = father.filter(i => !bestResultPartition.includes(i));
  return [...filteredFather.slice(0, start), ...bestResultPartition, ...filteredFather.slice(start)];
};

export const arrayToObject = array => array.reduce((acc, cur) => ({ ...acc, ...cur }), {});

const getSelectionFunction = field => {
  switch (field.type) {
    case FIELD_TYPES.NUMBER:
      return calculateMean;
    case FIELD_TYPES.NUMBER_ARRAY:
      return generateTSPIndividual;
    default:
      return calculateMean;
  }
};

export const calculateFieldResult = (individuals: IPopulation[], algorithm: IAlgorithm) => {
  const { dataModel } = algorithm.setup;
  const fields = dataModel.map(field => {
    if (field.type === FIELD_TYPES.NUMBER) return { [field.name]: getSelectionFunction(field)(individuals, field) };
    if (field.type === FIELD_TYPES.NUMBER_ARRAY)
      return { [field.name]: getSelectionFunction(field)(individuals, field) };
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
