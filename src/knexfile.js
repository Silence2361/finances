import join from 'path';
require('ts-node').register({
  project: join(__dirname, 'tsconfig.json'),
});

module.exports = require('./knexfile.ts').default;
