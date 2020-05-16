import envVar from 'env-var';

const isProduction = process.env.NODE_ENV === 'production';

export const GRAPHQL_PORT = envVar
  .get('GRAPHQL_PORT')
  .default(5001)
  .asPortNumber();
export const MONGO_URL = envVar
  .get('MONGO_URL')
  .required(isProduction)
  .asString();

export const JWT_SECRET = envVar
  .get('JWT_SECRET')
  .default('SECRET')
  .required(isProduction);

export const AWS_CLIENT_ID = envVar.get('AWS_ID').asString();
export const AWS_SECRET = envVar.get('AWS_SECRET').asString();
