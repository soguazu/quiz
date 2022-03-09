const app = require("./app");
const db = require("./database");
const convict = require("convict");
const dotEnvExtended = require("dotenv-extended");

// load environmental variable
dotEnvExtended.load({
  encoding: "utf8",
  silent: false,
  path: ".env",
  defaults: ".env.defaults",
  schema: ".env.schema",
  errorOnMissing: true,
  errorOnExtra: false,
  errorOnRegex: false,
  includeProcessEnv: false,
  assignToProcessEnv: true,
  overrideProcessEnv: false,
});

// Combine configuration
const configCombine = { app, db };

const config = convict(configCombine);

// Perform validation
config.validate({ allowed: "strict" });

module.exports = config;
