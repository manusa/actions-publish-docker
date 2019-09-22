#!/usr/bin/env node
'use strict';

const errorHandler = require('./error-handler');
const loadInputs = require('./load-inputs');
const tag = require('./tag');
const docker = require('./docker');

const canPerformAction = inputs => {
  if (process.env['GITHUB_REF'].startsWith('refs/pull') && !inputs.includePullRequests) {
    console.log(
      `Build triggered from Pull Request, action has not been configured to run on Pull Requests (see "include pull requests" input option for more info)`
    );
    return false;
  }
  return true;
};

const run = async () => {
  const inputs = loadInputs();
  if (canPerformAction(inputs)) {
    const tagName = await tag.computeTagName(inputs);
    console.log(`Tag name for image: ${tagName}`);
    const imageName = `${inputs.name}:${tagName}`;
    docker.build(imageName);
    docker.login(inputs);
    docker.push(inputs);
    console.log('Done!');
  }
};

process.on('unhandledRejection', errorHandler);
run().catch(errorHandler);
