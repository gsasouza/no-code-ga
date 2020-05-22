import mongoose from 'mongoose';

import { IUser } from '../user/UserModel';
import { FIELD_TYPES } from '../../../evolutionaryAlgorithm/selectPopulation/fields';

export interface IAlgorithm extends Document {
  name: string;
  user: IUser;
  status: {
    isRunning: boolean;
    isSelecting: boolean;
  };
  setup: {
    populationSize: number;
    dataModel: { name: string; type: keyof typeof FIELD_TYPES }[];
    generateFunction: string;
    testFunction: string;
  };
  currentData: {
    bestFitness: number;
    population: string;
  }
}

const setupSchema = new mongoose.Schema(
  {
    populationSize: {
      type: Number,
      required: true,
      default: 10,
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
    status: statusSchema,
    setup: setupSchema,
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
