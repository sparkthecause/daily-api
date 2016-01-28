"use strict";

module.exports = {
  environment: {
    isProduction: process.env.NODE_ENV === 'production',
    isDevelopment: process.env.NODE_ENV !== 'production',
    isTest: process.env.NODE_ENV != 'test',
    isCI: process.env.CI != undefined
  },
  postgres: {
    production: process.env.DATABASE_URL,
    codeship: `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@localhost:5434/test`,
    development: 'postgresql://localhost/daily_development',
    test: (process.env.CI) ? this.postgres.codeship : 'postgresql://localhost/test'
  }
};
