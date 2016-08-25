const exec = require('child_process').exec;
const url = require('url');
const config = require('../config');

const db = url.parse(config.postgres).path.slice(1);
const port = url.parse(config.postgres).port || 5432; // default PG port
const psql = [
  `psql -p ${port} --command 'DROP DATABASE IF EXISTS ${db}'`,
  `psql -p ${port} --command 'CREATE DATABASE ${db}'`,
  `psql -p ${port} --dbname ${db} --file database/database.sql`
].join(' && ');

exec(psql, (error, stdout, stderr) => {
  if (error) return console.error(error);
  console.log(stdout);
  console.log(stderr);
});
