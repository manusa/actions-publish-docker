const chai = require('chai');
const expect = chai.expect;

describe('tag module test suite', () => {
  let tag;
  beforeEach(() => {
    tag = require('../tag');
  });
  describe('computeTagName', () => {
    test('input tag has value, should return input tag literal', async () => {
      // Given
      const inputs = {
        tag: 'A tag name',
        tagScript: 'A tag script'
      };
      // When
      const result = await tag.computeTagName(inputs);
      // Then
      expect(result).to.equal('A tag name')
    });
    test('input tagScript has value and tag has not, should return input tagScript computation', async () => {
      // Given
      const inputs = {
        tagScript: 'return "A tag name";'
      };
      // When
      const result = await tag.computeTagName(inputs);
      // Then
      expect(result).to.equal('A tag name')
    });
    describe('default tag names, no tag or tagScript input specified', () => {
      beforeEach(() => {
        process.env = {};
      });
      test('Action triggered from master branch, should return branch name', async () => {
        // Given
        process.env = {
          GITHUB_REF: 'refs/heads/master'
        };
        // When
        const result = await tag.computeTagName({});
        // Then
        expect(result).to.equal('master');
      });
      test('Action triggered from tag, should return tag name', async () => {
        // Given
        process.env = {
          GITHUB_REF: 'refs/tags/v1.33.7'
        };
        // When
        const result = await tag.computeTagName({});
        // Then
        expect(result).to.equal('v1.33.7');
      });
      test('Action triggered from pull request, should return pr code', async () => {
        // Given
        process.env = {
          GITHUB_REF: 'refs/pull/#22'
        };
        // When
        const result = await tag.computeTagName({});
        // Then
        expect(result).to.equal('#22');
      });
    });
  });
});
