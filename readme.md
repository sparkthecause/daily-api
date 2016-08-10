# Spark Daily - API

[ ![Codeship Status for sparkthecause/daily-api](https://codeship.com/projects/3b9f5410-99e6-0133-68ef-3e6d3d1cec07/status?branch=master)](https://codeship.com/projects/126314)

## Getting Started

1. Install the node version listed in the [package.json](./package.json) via https://nodejs.org/en/
2. Run `npm install` in your terminal
3. Run `npm test` to make sure everything is kosher

## Running

*More configuration information can be inferred from [config.js](./config.js).*

### Local

*You will need to create a .env file similar to the [sample file (.sample-env)](./.sample-env) or pass in all of the environment variables when you run the scripts below. If you don't, you'll get this error: `{ [Error: ENOENT: no such file or directory, open '.env'] errno: -2, code: 'ENOENT', syscall: 'open', path: '.env' }
`. See https://github.com/motdotla/dotenv for more information.*

`npm start` will run the API and UI on port set via the environment variable `PORT` and connect to PostgreSQL instance at the url set via the environment variable `DATABASE_URL`.

If you'd like to enable debugging, use `npm run debug` and set the environment variable `ENV=local`.

### Production

`npm start` will run the API and UI on port set via the environment variable `PORT` and connect to PostgreSQL instance at the url set via the environment variable `DATABASE_URL`.

***DO NOT USE A .ENV FILE IN PRODUCTION! SET ACTUAL ENVIRONMENT VARIABLES.***

## Helpful Tools

 - [Postgress.app](http://postgresapp.com) is an amazingly simple tool for getting a PostgreSQL instance up and running locally
 - [Postico](https://eggerapps.at/postico/) is the best app for exploring, editing, and managing a PostgreSQL database on Mac OSX
