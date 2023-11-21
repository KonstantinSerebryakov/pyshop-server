## Description

Monorepo Nest.js server for [task](https://jl.pyshop.ru/tasks/typescript-dev/).

Tested with Postman.

***Note:*** CI/CD configured with Github Actions: client automatically injected from main branch to server and to heroku;

### Features

- ORMS\ODMS:
  - PrismaORM
- Databases:
  - PostgreSQL for local environment;
  - Supabase for deployed environment;
  - Redis with ioredis (not working with russian accounts)
- Authentification:
  - JWT with implementation of refresh tokens
- CRUD: GET, POST, PUT, PATCH, DELETE,

## Installation

```bash
npm install
```

## Running the app

```bash
# production
$ npm run start

# watch mode
$ npm run start:dev
```

## Prisma commands

```bash
# generate prisma client
$ npm run prisma-generate

# deploy
$ npm run prisma-deploy

# migrate
$ npx prisma migrate dev --name <name>
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
