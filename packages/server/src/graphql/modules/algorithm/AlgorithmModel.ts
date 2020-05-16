import mongoose from 'mongoose';

import { IUser } from '../user/UserModel';

export interface IAlgorithm extends Document {
  name: string;
  user: IUser;
  setup: {
    populationSize: number;
    dataModel: string[];
    generateFunction: string;
    testFunction: string;
  };
}

const setupSchema = new mongoose.Schema({
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
});

const algorithmSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    setup: setupSchema,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export const AlgorithmModel = conn => conn.model('Algorithm', algorithmSchema);

export default AlgorithmModel;
