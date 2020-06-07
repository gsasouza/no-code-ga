import { IPopulation } from '../../graphql/modules/population/PopulationModel';
import { IAlgorithm } from '../../graphql/modules/algorithm/AlgorithmModel';
import { FIELD_TYPES } from './fields';
import { arrayToObject } from './tournamentSelection';

export const calculateGenerationsWithModifier = algorithm => {
  const { evolveConfig } = algorithm;
  const { mutationRate, mutationBaseRate, generationsWithRateModifier } = evolveConfig;
  if (mutationBaseRate !== mutationRate) return generationsWithRateModifier + 1;
  return generationsWithRateModifier;
};

export const calculateMutationRateChange = algorithm => {
  const { evolveConfig } = algorithm;
  const { mutationRate, mutationBaseRate, generationsWithRateModifier } = evolveConfig;
  console.log(mutationRate, mutationBaseRate, generationsWithRateModifier);

  if (mutationRate >= mutationBaseRate) {
    if (generationsWithRateModifier < 10)
      return {
        ...evolveConfig,
        generationsWithRateModifier: 0,
        mutationRate: evolveConfig.mutationBaseRate,
      };
    return {
      ...evolveConfig,
      generationsWithRateModifier: 0,
      mutationRate: evolveConfig.mutationBaseRate * 20,
    };
  }
  return {
    ...evolveConfig,
    generationsWithRateModifier: 0,
    mutationRate: evolveConfig.mutationBaseRate / 1000000,
  };
};

const calculateFieldResult = (individual: IPopulation, algorithm: IAlgorithm, mutationRate: number) => {
  const { dataModel } = algorithm.setup;
  const fields = dataModel.map(field => {
    if (field.type === FIELD_TYPES.NUMBER) return { [field.name]: individual[field.name] * mutationRate };
    return { [field.name]: 0 };
  });

  return arrayToObject(fields);
};

const getNormalizedRate = rate => rate / 100 + 1;

const mutateIndividual = (individual, algorithm) => {
  const { evolveConfig } = algorithm;
  const { mutationRate } = evolveConfig;
  return calculateFieldResult(individual, algorithm, getNormalizedRate(mutationRate));
};

export default mutateIndividual;
