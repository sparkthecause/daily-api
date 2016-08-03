process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'development') {

  require('dotenv').config();

}

const isCodeship = (process.env.CI_NAME && process.env.CI_NAME === 'codeship');
if (isCodeship) {

  process.env.DATABASE_URL = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@localhost:5434/test`;

}

module.exports = {
  env: process.env.NODE_ENV, // test, development, or production
  port: process.env.PORT,
  postgres: process.env.DATABASE_URL,
  postmark: process.env.POSTMARK_API_KEY,
  cdn: 'https://cdn.sparkthecause.com/daily',
  email: {
    from: 'daily@sparkthecause.com',
    fromname: 'Spark Daily'
  }
};
