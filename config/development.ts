export default {
  database: {
    engine: "mysql",
    host: "127.0.0.1",
    maxConnections: 25,
    maxIdleTime: 30000,
    minConnections: 0,
    name: "",
    password: "",
    port: "",
    user: ""
  },
  mybb: {
    engine: "mysql",
    host: "127.0.0.1",
    maxConnections: 25,
    maxIdleTime: 30000,
    minConnections: 0,
    name: "",
    password: "",
    port: "",
    user: ""
  },
  lava: {
    interfaceUrl: "",
    interfacePort: 3000,
    debug: true,
    sessionSecret: "",
    cookieConfig: {
      domain: "",
      maxAge: 7 * 24 * 60 * 60 * 1000
    }
  },
  redis: {
    host: ""
  }
};
