describe('docker module test suite', () => {
  let docker;
  let child_process;
  beforeEach(() => {
    jest.resetModules();
    jest.mock('child_process');
    docker = require('../docker');
    child_process = require('child_process');
    child_process.execSync.mockImplementation(() => { });
  });
  test('build, should invoke docker build command', () => {
    // Given
    const params = {
      imageName: 'marcnuri/twain'
    };
    // When
    docker.build(params);
    // Then
    expect(child_process.execSync).toHaveBeenCalledTimes(1);
    expect(child_process.execSync).toHaveBeenCalledWith(
      'docker build -t marcnuri/twain .'
    );
  });
  test('login, with registry, should invoke docker login command', () => {
    // Given
    const inputs = {
      username: 'User',
      password: 'S3cr3t',
      registry: 'my-own.registry'
    };
    // When
    docker.login(inputs);
    // Then
    expect(child_process.execSync).toHaveBeenCalledTimes(1);
    expect(child_process.execSync).toHaveBeenCalledWith(
      'docker login -u User --password-stdin my-own.registry',
      { input: 'S3cr3t' }
    );
  });
  test('login, with no registry, should invoke docker login command', () => {
    // Given
    const inputs = {
      username: 'User',
      password: 'S3cr3t'
    };
    // When
    docker.login(inputs);
    // Then
    expect(child_process.execSync).toHaveBeenCalledTimes(1);
    expect(child_process.execSync).toHaveBeenCalledWith(
      'docker login -u User --password-stdin ',
      { input: 'S3cr3t' }
    );
  });
  test('push, with no registry, should invoke docker push command', () => {
    // Given
    const inputs = {
      imageName: 'marcnuri/twain',
    };
    // When
    docker.push(inputs);
    // Then
    expect(child_process.execSync).toHaveBeenCalledTimes(1);
    expect(child_process.execSync).toHaveBeenCalledWith(
      'docker push marcnuri/twain'
    );
  });
  test('push, with registry, should invoke docker push command including registry in name', () => {
    // Given
    const inputs = {
      imageName: 'marcnuri/twain'
    };
    // When
    docker.push(inputs);
    // Then
    expect(child_process.execSync).toHaveBeenCalledTimes(1);
    expect(child_process.execSync).toHaveBeenCalledWith(
      'docker push marcnuri/twain'
    );
  });
});
