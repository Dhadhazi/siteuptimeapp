/*
 * Create and export configuration variables
 *
 */

// Container for all the environments
var environments = {};

// Staging (default) env
environments.staging = {
  port: 3000,
  envName: "staging",
};

//Production env
environments.production = {
  port: 5000,
  envName: "production",
};

// Determine which env twas passed as command-line argument
var currentEnv = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : "";

// Check that the current environment is on of the envs above, if not, default to staging
const envToExport = environments[currentEnv] || environments.staging;

module.exports = envToExport;
