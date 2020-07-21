import mongoose from 'mongoose';

import { IAlgorithm } from '../algorithm/AlgorithmModel';
import { IUser } from '../user/UserModel';

export interface ILog extends Document {
  populationFitness: number;
  fitness: number;
  algorithm: IAlgorithm;
  user: IUser;
  bestIndividual: string;
}

const logSchema = new mongoose.Schema(
  {
    populationFitness: {
      type: Number,
      required: true,
    },
    fitness: {
      type: Number,
      required: true,
    },
    bestIndividual: {
      type: String,
      required: true,
    },
    algorithm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export const LogModel = conn => conn.model('Log', logSchema);

export default LogModel;
