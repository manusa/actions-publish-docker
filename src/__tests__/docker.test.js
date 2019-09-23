describe('docker module test suite', () => {
  let docker;
  let child_process;
  beforeEach(() => {
    jest.resetModules();
    jest.mock('child_process');
    docker = require('../docker');
    child_process = require('child_process');
    child_process.execSync.mockImplementation(() => {});
  });
  test('build, should invoke docker build command', () => {
    // Given
    const imageName = 'marcnuri/twain';
    // When
    docker.build(imageName);
    // Then
    expect(child_process.execSync).toHaveBeenCalledTimes(1);
    expect(child_process.execSync).toHaveBeenCalledWith(
      'docker build -t marcnuri/twain .'
    );
  });
  test('login, should invoke docker login command', () => {
    // Given
    const inputs = {
      username: 'User',
      password: 'S3cr3t',
      registry: 'https://my.own.registry'
    };
    // When
    docker.login(inputs);
    // Then
    expect(child_process.execSync).toHaveBeenCalledTimes(1);
    expect(child_process.execSync).toHaveBeenCalledWith(
      'docker login -u User --password-stdin https://my.own.registry',
      {input: 'S3cr3t'}
    );
  });
  test('push, should invoke docker push command', () => {
    // Given
    const imageName = 'marcnuri/twain';
    // When
    docker.push(imageName);
    // Then
    expect(child_process.execSync).toHaveBeenCalledTimes(1);
    expect(child_process.execSync).toHaveBeenCalledWith(
      'docker push marcnuri/twain'
    );
  });
});
