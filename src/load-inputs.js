'use strict';

const core = require('@actions/core');

const loadInputs = () => {
  console.log('Loading input variables');
  const result = {};
  result.name = core.getInput('name', { required: true });
  result.username = core.getInput('username', { required: true });
  result.password = core.getInput('password', { required: true });
  result.tag = core.getInput('tag', { required: false });
  result.tagScript = core.getInput('tag script', { required: false });
  result.registry = core.getInput('registry', { required: false });
  result.includePullRequests = core.getInput('include pull requests',
    { required: false }).toString().toLowerCase() === 'true';
  result.dockerfilePath = core.getInput('dockerfile path', { required: false });
  return result;
};

module.exports = loadInputs;
