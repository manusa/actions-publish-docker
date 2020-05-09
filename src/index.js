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
  const params = loadInputs();
  if (canPerformAction(params)) {
    const tagName = await tag.computeTagName(params);
    console.log(`Tag name for image: ${tagName}`);
    params.imageName = `${params.name}:${tagName}`;
    if (params.registry) {
      params.imageName = `${params.registry}/${params.imageName}`;
    }
    console.log(`Image name: ${params.imageName}`);
    docker.build(params);
    docker.login(params);
    docker.push(params);
    console.log('Done!');
  }
};

process.on('unhandledRejection', errorHandler);
run().catch(errorHandler);
