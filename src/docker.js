"use strict";

const child_process = require('child_process');

const build = inputs => {
  console.log('Building docker image');
  const imageName = `${inputs.name}:${inputs.tag}`;
  child_process.execSync(`docker build -t ${imageName} .`)
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
