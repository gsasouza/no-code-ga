import mongoose from 'mongoose';

declare module 'mongoose' {
  interface ConnectionBase {
    host: string;
    port: number;
    name: string;
  }
}

let connection: mongoose.Connection | null = null;

export const getConnection = async (url: string): Promise<mongoose.Connection> => {
  if (!connection) {
    connection = await mongoose.createConnection(url, {
      bufferCommands: false,
      bufferMaxEntries: 0,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  }
  return connection;
};
