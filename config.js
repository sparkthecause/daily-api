"use strict";

const config = {
  environment: {
    isProduction: process.env.NODE_ENV === 'production',
    isDevelopment: process.env.NODE_ENV !== 'production',
    isTest: process.env.NODE_ENV === 'test',
    isCI: process.env.CI != undefined
  },
  postgres: {
    url: '',
    production: process.env.DATABASE_URL,
    codeship: `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@localhost:5434/test`,
    development: 'postgresql://localhost/daily_development',
    test: (process.env.CI) ? this.postgres.codeship : 'postgresql://localhost/test'
  }
};

if (config.environment.isProduction) {
  config.postgres.url = config.postgres.production;
} else if (config.environment.isTest) {
  config.postgres.url = config.postgres.test;
} else {
  config.postgres.url = config.postgres.development;
}

module.exports = config;
