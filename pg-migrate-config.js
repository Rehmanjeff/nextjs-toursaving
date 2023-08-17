module.exports = {
   driver: 'pg',
   host: process.env.DATABASE_HOST,
   database: process.env.DATABASE_NAME,
   user: process.env.DATABASE_USER,
   password: process.env.DATABASE_PASSWORD,
   port: process.env.DATABASE_PORT,
   schema: 'public',
   migrationsTable: 'migrations',
};