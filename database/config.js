const exec = require('child_process').exec;
const url = require('url');
const config = require('../src/config');

const db = url.parse(config.postgres).path.slice(1);
const port = url.parse(config.postgres).port || 5432; // default PG port
const psql = [
  `psql --port ${port} --command 'DROP DATABASE IF EXISTS ${db}'`,
  `psql --port ${port} --command 'CREATE DATABASE ${db}'`,
  `psql --port ${port} --dbname ${db} --file database/schema.sql`
  `psql --port ${port} --dbname ${db} --file database/data.sql`
].join(' && ');

exec(psql, (error, stdout, stderr) => {
  if (error) return console.error(error);
  console.log(stdout);
  console.log(stderr);
});
