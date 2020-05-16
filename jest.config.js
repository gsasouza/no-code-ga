module.exports = {
  projects: ['<rootDir>/packages/server/jest.config.js'],
  transform: {
    '^.+\\.(js|ts|tsx)?$': require('path').resolve('./test/babelTransformer'),
  },
  moduleFileExtensions: ['js', 'css', 'ts', 'tsx'],
};
