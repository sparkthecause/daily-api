'use strict';

const config = {
  base: {
    isProduction: process.env.NODE_ENV === 'production',
    isDebug: process.env.DEBUG,
    port: process.env.PORT,
    postgres: process.env.DATABASE_URL,
    sendgrid: process.env.SENDGRID_API_KEY
  },
  test: {
    port: 3001,
    postgres: (process.env.CI) ? `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@localhost:5434/test` : 'postgresql://localhost/test'
  },
  local: {
    port: 3000,
    postgres: 'postgresql://localhost/daily_development'
  },
  staging: {}
};

module.exports = Object.assign(config.base, config[process.env.ENV]);
