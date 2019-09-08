'use strict';

const core = require('@actions/core');

const loadInputs = () => {
  const result = {};
  result.name = core.getInput('name', {required: true});
  result.tag = core.getInput('tag', {required: true});
  result.username = core.getInput('username', {required: true});
  result.password = core.getInput('password', {required: true});
  result.registry = core.getInput('name', {required: false});
};

module.exports = loadInputs;
