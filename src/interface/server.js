const { createServer } = require('http');
const express = require('express');
const path = require('path');

/**
 * Creates and configures an HTTP server
 */

class HttpServer {
  constructor({ config, logger, routes }) {
    const app = express();
    app.disable('x-powered-by');
    // URL for API documentation

    app.use(
      '/rest-docs',
      express.static(path.resolve(__dirname, '../../docs/apidocs/'))
    );
    app.use(routes);
    this.server = createServer(app);
    this.config = config;
    this.logger = logger;
    this.port = config.get('app.port');
    this.serviceName = config.get('app.serviceName');
    this.version = config.get('app.version');
  }

  async start() {
    this.server.listen(this.port, () => {
      this.logger.info(`REST server for
      ${this.serviceName} ${this.version}
      listening on port ${this.port}`);
    });
  }

  close(cb) {
    return this.server.close(cb);
  }
}

module.exports = HttpServer;
