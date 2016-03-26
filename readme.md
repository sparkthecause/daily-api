# Spark Daily

[ ![Codeship Status for sparkthecause/daily-www](https://codeship.com/projects/3b9f5410-99e6-0133-68ef-3e6d3d1cec07/status?branch=master)](https://codeship.com/projects/126314)

## Getting Started

1. Install the node version listed in the [package.json](./package.json) via https://nodejs.org/en/
2. Run `npm install` in your terminal
3. Run `npm test` to make sure everything is kosher

## Running

*All configuration information can be found in [config.js](./config.js).*

### Local

`ENV=local npm start` will run the API and UI on port `3000` and connect to a local PostgreSQL.

If you'd like to enable debugging, use `ENV=local npm run debug`.

### Production

`npm start` will run the API and UI on port set via the environment variable `PORT` and connect to PostgreSQL instance at the url set via the environment variable `DATABASE_URL`.

## Helpful Tools

 - [Postgress.app](http://postgresapp.com) is an amazingly simple tool for getting a PostgreSQL instance up and running locally
 - [Postico](https://eggerapps.at/postico/) is the best app for exploring, editing, and managing a PostgreSQL database on Mac OSX
