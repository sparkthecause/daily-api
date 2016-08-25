const exec = require('child_process').exec;
const url = require('url');
const config = require('../config');

const db = url.parse(config.postgres).path.slice(1);
const psql = [
  `psql --command 'DROP DATABASE IF EXISTS ${db}'`,
  `psql --command 'CREATE DATABASE ${db}'`,
  `psql --dbname ${db} --file database/database.sql`
].join(' && ');

exec(psql, (error, stdout, stderr) => {
  if (error) return console.error(error);
  console.log(stdout);
  console.log(stderr);
});
