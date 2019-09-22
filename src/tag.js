const script = require('./script');

const defaultTagName = () =>
  process.env['GITHUB_REF']
    .replace('refs/heads/', '')
    .replace('refs/tags/', '')
    .replace('refs/pull/', '');

const computeTagName = inputs => {
  if (inputs.tag) {
    return inputs.tag;
  } else if (inputs.tagScript) {
    return script(inputs.tagScript);
  }
  return defaultTagName();
};

module.exports = {
  computeTagName
};
