const server = {
    serviceName: {
      doc: "quiz",
      format: "*",
      default: "quiz",
      env: 'NAME',
      sensitive: false,
    },
    port: {
      doc: "The port to bind",
      format: "port",
      default: 8080,
      env: 'PORT',
      sensitive: false,
    },
    version: {
      doc: "The API version",
      format: "*",
      default: "v1",
      env: 'API_VERSION',
      sensitive: false,
    },
    env: {
      doc: "The application environment",
      format: ["production", "development", "test", "qa", "staging"],
      default: "development",
      env: 'NODE_ENV',
      sensitive: false,
    }
  };
  
  export default server;
  