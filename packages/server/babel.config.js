const config = require('@gsasouza/babel');

module.exports = {
  ...config,
  ignore: [/node_modules\/(?!@gsasouza)/],
};
