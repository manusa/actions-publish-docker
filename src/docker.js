"use strict";

const child_process = require('child_process');

const build = ({imageName, dockerfilePath = "."}) => {
  console.log(`Building docker image: ${imageName} at path ${dockerfilePath}`);
  child_process.execSync(`docker build -t ${imageName} ${dockerfilePath}`);
};

const login = ({username, password, registry = ''}) => {
  console.log('Logging into docker');
  child_process.execSync(
    `docker login -u ${username} --password-stdin ${registry}`,
    { input: password }
  );
};

const push = ({imageName}) => {
  console.log(`Pushing docker image (${imageName})`);
  child_process.execSync(
    `docker push ${imageName}`
  );
};

module.exports = {
  build,
  login,
  push
};
