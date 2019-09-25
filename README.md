Publish to Docker GitHub Action
===============================

[<img src="https://github.com/manusa/actions-publish-docker/workflows/Main%20workflow/badge.svg" />](https://github.com/manusa/actions-publish-docker/actions)


This GitHub action allows you to create and publish Docker images into a Docker registry.

## Usage

### Basic

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v1
  - run: commandToBuildYourProject.sh
  - name: Dockerize
    if: success()
    uses: manusa/actions-publish-docker@master
    with:
      name: marcnuri/mnimapsync
      username: ${{ secrets.DOCKER_HUB_USER }}
      password: ${{ secrets.DOCKER_HUB_PASSWORD }}
```

### Required input parameters

| Parameter | Description |
| --------- | ----------- |
| `name` | Name of the Docker image |
| `username` | Username for Docker registry |
| `password` | Password for Docker registry |

By default the published image will be tagged using the git branch or tag name (`master` branch
will be tagged as `latest`).

### Optional input parameters

| Parameter | Description |
| --------- | ----------- |
| `tag` | Tag for the Docker image |
| `tag script` | Script to compute tag name for the Docker image, receives `context` as a variable. Ignored if used together with `tag` parameter |
| `registry` | URL for the Docker registry to login |
| `include pull requests` | By default (to avoid accidents) action is ignored in pull requests. This parameter will force publishing the image even if the action was triggered from a pull request |

### Advanced

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v1
  - run: commandToBuildYourProject.sh
  - name: Dockerize
    if: success()
    uses: manusa/actions-publish-docker@master
    with:
      name: marcnuri/mnimapsync
      username: ${{ secrets.DOCKER_HUB_USER }}
      password: ${{ secrets.DOCKER_HUB_PASSWORD }}
      tag script: |
        return context.ref
          .replace('refs/heads/
          .replace('refs/tags/'
          .replace('refs/pull/'
          .replace(/\//g, '_')
          .replace(/#/g, '');
      registry: localhost:8080
```

## License

The scripts and documentation in this project are released under the [Apache 2.0](./LICENSE).
