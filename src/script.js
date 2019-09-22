const {context} = require('@actions/github');
const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;

const script = async scriptBody => {
  const func = new AsyncFunction('context', scriptBody);
  return await func(context);
};

module.exports = script;
