module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    TEST_DB_URL="postgresql://noteful@localhost/knex-test"
  }
  