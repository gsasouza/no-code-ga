import mongoose from 'mongoose';

import { IAlgorithm } from '../algorithm/AlgorithmModel';
import { IUser } from '../user/UserModel';

export interface IPopulation extends Document {
  fields: string;
  fitness: number;
  algorithm: IAlgorithm;
  user: IUser;
}

const populationSchema = new mongoose.Schema(
  {
    fields: {
      type: String,
      required: true,
    },
    fitness: {
      type: Number,
      default: null,
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

export const PopulationModel = conn => conn.model('Population', populationSchema);

export default PopulationModel;
