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
  },
  mybb: {
    engine: process.env.MYBB_ENGINE || "mysql",
    host: process.env.MYBB_HOST || "127.0.0.1",
    maxConnections: process.env.MYBB_MAX_CONN || 25,
    maxIdleTime: process.env.MYBB_MAX_IDLE_MS || 30000,
    minConnections: process.env.MYBB_MIN_CONN || 0,
    name: process.env.MYBB_NAME,
    password: process.env.MYBB_PASSWORD,
    port: process.env.MYBB_PORT,
    user: process.env.MYBB_USER
  },
  lava: {
    interfaceUrl: process.env.INTERFACE_URL,
    interfacePort: process.env.INTERFACE_PORT,
    debug: process.env.INTERFACE_DEBUG,
    sessionSecret: process.env.INTERFACE_SESSION_SECRET,
    cookieConfig: {
      domain: process.env.INTERFACE_DOMAIN,
      maxAge: 7 * 24 * 60 * 60 * 1000
    }
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  },
  cdn: {
    url: process.env.CDN_URL
  }
};
