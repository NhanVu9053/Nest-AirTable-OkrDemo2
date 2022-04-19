<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# Airtable With NestJS

This is one example of using Airtable with NestJS. It is based off of [ and leverages the [`airtable`](https://www.npmjs.com/package/airtable) module for the heavy lifting. The biggest thing it does is chunk up requests to Airtable, since the API is limited to 10 records at a time.

The included `okr` service has basic CRUD functionality and returns a plain object, but can also return the Airtable record by passing `returnAirtableRecord: true` as an optional argument to the different methods.

Feedback welcome!

## Prerequisites

- An Airtable base with a table named `okr` with columns:
  - `Name` (single line text)
 

## Auth0

- Create Account at link `https://auth0.com/signup`  

 - Create `APIs` . At `Setting` Enable `Enable RBAC` `Add Permissions in the Access Token` `Allow Skipping User Consent` `Allow Offline Access`

## Create .ENV

- Create .env file look like `env.sample` 

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
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

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
# Nest-AirTable-OkrDemo
# Nest-AirTable-OkrDemo2
# Nest-AirTable-OkrDemo2
