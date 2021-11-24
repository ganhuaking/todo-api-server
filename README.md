# todo-api-server

## Description

This repository is a todo api Server with [Nest](https://github.com/nestjs/nest) framework TypeScript.

## architecture

![](https://i.imgur.com/eV0idop.png)

## api view

### Tasks

| Endpoint          | Method | Description               |
| ----------------- | ------ | ------------------------- |
| tasks/            | GET    | Get tasks (incl. filters) |
| tasks/:id         | GET    | Get a task                |
| tasks/            | POST   | Create a task             |
| tasks/:id         | DELETE | Delete a task             |
| tasks/:id/status/ | PATCH  | Update task status        |

### Auth

| Endpoint          | Method | Description               |
| ----------------- | ------ | ------------------------- |
| auth/signup       | POST   | Sign up                   |
| auth/signin       | POST   | Sign in                   |

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
