'use strict';

const core = require('@actions/core');

const loadInputs = () => {
  console.log('Loading input variables');
  const result = {};
  result.name = core.getInput('name', {required: true});
  result.tag = core.getInput('tag', {required: true});
  result.username = core.getInput('username', {required: true});
  result.password = core.getInput('password', {required: true});
  result.registry = core.getInput('registry', {required: false});
  return result;
};

module.exports = loadInputs;
