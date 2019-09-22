"use strict";

const child_process = require('child_process');

const build = imageName => {
  console.log(`Building docker image: ${imageName}`);
  child_process.execSync(`docker build -t ${imageName} .`);
};

const login = inputs => {
  console.log('Logging into docker');
  child_process.execSync(
    `docker login -u ${inputs.username} --password-stdin`,
    {input: inputs.password}
  );
};

const push = imageName => {
  console.log('Pushing docker image');
  child_process.execSync(
    `docker push ${imageName}`
  );
};

module.exports = {
  build,
  login,
  push
};
