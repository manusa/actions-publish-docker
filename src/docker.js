"use strict";

const child_process = require('child_process');

const build = (imageName, dockerfilePath = ".") => {
  if (dockerfilePath === "") {
    dockerfilePath = "."
  }
  console.log(`Building docker image: ${imageName} at path ${dockerfilePath}`);
  child_process.execSync(`docker build -t ${imageName} ${dockerfilePath}`);
};

const login = inputs => {
  console.log('Logging into docker');
  child_process.execSync(
    `docker login -u ${inputs.username} --password-stdin ${inputs.registry}`,
    { input: inputs.password, stdio: 'inherit' }
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
