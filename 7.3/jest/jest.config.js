// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    verbose: true,
    "collectCoverageFrom": [
          "**/*.{js,jsx}",
          "!**jest.config.js",
          "!**/node_modules/**",
          "!**/coverage/**"
        ],
    "coverageThreshold": {
        "global":{
            "branches": 100,
            "functions": 100,
            "lines": 100
        }
      }  

  };
  
  module.exports = config;