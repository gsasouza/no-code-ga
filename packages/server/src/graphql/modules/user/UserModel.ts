import mongoose from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  picture: string;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    picture: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { timestamps: true },
);

export const User = conn => conn.model('User', userSchema);

export default User;
