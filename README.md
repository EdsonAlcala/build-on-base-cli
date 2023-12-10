# Build On Base CLI

Simple, minimalistic and opinionated boilerplates to start developing Onchain Apps on Base.

![npm](https://img.shields.io/npm/v/build-on-base?label=Current%20version&color=%234c1) ![GitHub](https://img.shields.io/github/license/edsonalcala/build-on-base-cli?label=License&color=%234c1)

Available boilerplates:

- [NextJS + Foundry]
- [Vite React TS + Foundry]

## Getting Started

```bash
$ npx build-on-base create 

# Once the installation is complete

$ cd <your app name>

$ yarn 

$ yarn chain

$ yarn deploy

$ yarn dev
```

## Develop

In order to develop and test the CLI you need the following:

- [NVM]
- [Yarn] # Once you run `nvm use` install it globally via `corepack enable`

Then you can run the following commands:

```bash
$ yarn # to install dependencies

$ yarn build

$ yarn start create # to test the cli we pass create to the start command
```

### Architecture

The project consist of a simple CLI that includes references to multiple templates hosted in their own repository. These templates or boilerplates have the same commands and are fully independent.

### Adding new boilerplates

To extend the template options, include the name and Github url in the `templates/index.ts` file.

## Roadmap

[ ] Include a new boilerplate for Foundry + NextJS + Subgraph

[ ] Include a new boilerplate for Foundry + Vite React TS + Subgraph

<!-- References -->

[NextJS + Foundry]: https://github.com/EdsonAlcala/vite-foundry
[Vite React TS + Foundry]: https://github.com/EdsonAlcala/nextjs-foundry
[NVM]: https://github.com/nvm-sh/nvm
[Yarn]: https://yarnpkg.com/