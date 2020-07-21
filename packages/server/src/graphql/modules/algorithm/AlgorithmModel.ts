import mongoose from 'mongoose';

import { IUser } from '../user/UserModel';
import { FIELD_TYPES } from '../../../evolutionaryAlgorithm/selectPopulation/fields';

export type Field = {
  name: string;
  type: keyof typeof FIELD_TYPES;
};

export interface IAlgorithm extends Document {
  name: string;
  user: IUser;
  status: {
    isRunning: boolean;
    isSelecting: boolean;
  };
  evolveConfig: {
    mutationBaseRate: number;
    mutationRate: number;
    mutationRateModifier: number;
    generationsWithRateModifier: number;
  };
  setup: {
    populationSize: number;
    dataModel: Field[];
    generateFunction: string;
    testFunction: string;
  };
  currentData: {
    bestFitness: number;
    population: string;
  };
}

const setupSchema = new mongoose.Schema(
  {
    populationSize: {
      type: Number,
      required: true,
      default: 100,
    },
    dataModel: [
      {
        name: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
      },
    ],
    generateFunction: {
      type: String,
    },
    testFunction: {
      type: String,
      required: true,
    },
  },
  { autoIndex: false },
);

const evolveConfigSchema = new mongoose.Schema(
  {
    mutationBaseRate: {
      type: Number,
      required: true,
    },
    mutationRate: {
      type: Number,
      required: true,
    },
    mutationRateModifier: {
      type: Number,
      required: true,
    },
    generationsWithRateModifier: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { autoIndex: false },
);

const currentDataSchema = new mongoose.Schema(
  {
    bestFitness: {
      type: Number,
    },
    population: {
      type: String,
    },
  },
  { autoIndex: false },
);

const statusSchema = new mongoose.Schema(
  {
    isRunning: {
      type: Boolean,
    },
    isSelecting: {
      type: Number,
    },
  },
  { autoIndex: false },
);

const algorithmSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: statusSchema,
    setup: setupSchema,
    evolveConfig: evolveConfigSchema,
    currentData: currentDataSchema,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export const AlgorithmModel = conn => conn.model('Algorithm', algorithmSchema);

export default AlgorithmModel;
