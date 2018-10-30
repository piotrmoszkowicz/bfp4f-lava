interface ConfigType {
  engine: string;
  host: string;
  maxIdleTime: number;
  maxConnections: number;
  minConnections: number;
  name: string;
  password: string;
  port: number;
  user: string;
}

export default ConfigType;
