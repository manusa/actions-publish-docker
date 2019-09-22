const {context} = require('@actions/github');

const script = async scriptBody => {
  const func = new AsyncFunction('context', scriptBody);
  await func(context);
};

module.exports = script;
