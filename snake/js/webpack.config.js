const path = require('path');

module.exports = {
  entry: 'snake/js/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
