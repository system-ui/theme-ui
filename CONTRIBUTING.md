# Contributing

Hi! We're looking for some help, and we're excited that you're interested!
We want contributing to this project to be enjoyable and productive for everyone.
All contributions are welcome, including opening and commenting on issues and pull requests, adding or updating the docs,
bug fixes, blog posts, and suggestions for new features.
We follow a [Code of Conduct](CODE_OF_CONDUCT.md), so please be kind to others and reach out if you have any questions or concerns.

Theme UI is still in an early stage and things will likely move quickly.
The time to review a pull request depends on the complexity involved,
so please be patient if a particular feature takes longer to review than others.

## Local Development

This repo uses [Yarn Workspaces][] and [Lerna][] to develop multiple packages together as a monorepo.
Be sure to install [Yarn][] before setting up the development environment.

Install dependencies and link local packages in the root directory:

```sh
yarn
```

In `postinstall` script running after dependencies install, [Preconstruct][] links source files to dist directories.

Depending on the part of the codebase you're working on, you'll want to run tests or docs development server.

## Working on the docs

The docs are using Gatsby. To start development server run

```sh
yarn workspace docs start
```

Changes to libraries will immediately hot reload the docs.

## Tests

Unit tests are run with [Jest][], and each package should include a `test/` directory with unit tests for that package.

Running tests:

```sh
yarn test
```

Running tests in watch mode:

```sh
yarn test --watch
```

You can specify what tests to run by passing test path pattern as the first positional argument and test name pattern after `-t` flag.

```sh
yarn test core/test/react-jsx -t 'accepts sx prop'
```

## Pull Requests

When opening a pull request, please be sure to update any relevant documentation in the READMEs or in the `packages/docs` directory.
Also include a high-level list of changes in the [CHANGELOG.md](CHANGELOG.md) file at the top under the `## Unreleased` heading.

[yarn]: https://yarnpkg.com
[yarn workspaces]: https://yarnpkg.com/en/docs/workspaces
[lerna]: https://github.com/lerna/lerna
[jest]: https://jestjs.io/
[preconstruct]: https://preconstruct.tools/guides/using-preconstruct-dev-in-a-monorepo
