const chai = require('chai');
const expect = chai.expect;

describe('load-inputs module test suite', () => {
  let loadInputs;
  beforeEach(() => {
    loadInputs = require('../load-inputs');
    process.env = {};
  });
  describe('loadInputs', () => {
    test('Required variables in env, should return valid inputs', () => {
      // Given
      process.env = {
        INPUT_NAME: 'name',
        INPUT_TAG: 'tag',
        INPUT_USERNAME: 'username',
        INPUT_PASSWORD: 's3cr3t'
      };
      // When
      const result = loadInputs();
      // Then
      expect(result).to.eql(
        {
          name: 'name',
          username: 'username',
          password: 's3cr3t',
          tag: 'tag',
          registry: ''
        })
    });
    test('Required variables NOT in env, should throw error', () => {
      // Given
      process.env = {
        INPUT_NAME: 'name',
        INPUT_TAG: 'tag'
      };
      // When - Then
      expect(loadInputs).to.throw('Input required and not supplied: username');
    });
    test('Required and optional variables in env, should return valid inputs', () => {
      // Given
      process.env = {
        INPUT_NAME: 'name',
        INPUT_TAG: 'tag',
        INPUT_USERNAME: 'username',
        INPUT_PASSWORD: 's3cr3t',
        INPUT_REGISTRY: 'https://hub.marcnuri.com'
      };
      // When
      const result = loadInputs();
      // Then
      expect(result).to.eql(
        {
          name: 'name',
          username: 'username',
          password: 's3cr3t',
          tag: 'tag',
          registry: 'https://hub.marcnuri.com'
        })
    });
  });
});
