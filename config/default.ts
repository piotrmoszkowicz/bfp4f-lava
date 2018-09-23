export default {
  database: {
    engine: process.env.DATABASE_ENGINE || "mysql",
    host: process.env.DATABASE_HOST || "127.0.0.1",
    maxConnections: process.env.DATABASE_MAX_CONN || 25,
    maxIdleTime: process.env.DATABASE_MAX_IDLE_MS || 30000,
    minConnections: process.env.DATABASE_MIN_CONN || 0,
    name: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER
  }
};
