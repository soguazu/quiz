/**
 * Runs the application
 */

const App = require('./app');
const container = require('./container');

const app = new App(container.cradle);

app.start();

process.on('SIGINT', app.shutdown.bind(app));

process.on('SIGTERM', app.shutdown.bind(app));
