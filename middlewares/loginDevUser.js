const User = require("../models/User");

/** Express middleware for logging in a sample user in development */
module.exports = async (req, res, next) => {
  req.user = await User.findOne({});
  next();
};
