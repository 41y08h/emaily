const oauth = require("./oauth");
const database = require("./database");
const environment = require("./environment");

module.exports = (app) => {
  // Start services
  oauth();
  database();

  // Start app configuration
  environment.development(app);
  environment.common(app);
  environment.production(app);
};
