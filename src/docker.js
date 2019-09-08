"use strict";

const build = inputs => {
  console.log('Building docker image');
};

const login = inputs => {
  console.log('Logging into docker');
};

const push = inputs => {
  console.log('Pushing docker image');
};

module.exports = {
  build,
  login,
  push
};
