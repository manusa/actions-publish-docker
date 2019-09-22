const core = require('@actions/core');

const errorHandler = error => {
  console.error(error);
  core.setFailed(error.message);
};

module.exports = errorHandler;
