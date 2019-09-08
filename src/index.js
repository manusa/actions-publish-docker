#!/usr/bin/env node
'use strict';

const loadInputs = require('./load-inputs');
const docker = require('./docker');

const run = () => {
  const inputs = loadInputs();
  docker.build(inputs);
  docker.login(inputs);
  docker.push(inputs);
  console.log('Done!');
};

run();
