if (process.env.NODE_ENV !== 'production' && process.env.ENV !== 'test') {
  require('dotenv').config()
}
if (process.env.CI_NAME && process.env.CI_NAME === 'codeship') {
  process.env.DATABASE_URL = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@localhost:5434/test`
}

module.exports = {
  isProduction: process.env.NODE_ENV === 'production',
  isDebug: process.env.DEBUG,
  port: process.env.PORT,
  postgres: process.env.DATABASE_URL,
  sendgrid: process.env.SENDGRID_API_KEY,
  cdn: 'https://cdn.sparkthecause.com/daily',
  email: {
    from: 'daily@sparkthecause.com',
    fromname: 'Spark Daily'
  }
}
