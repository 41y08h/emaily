const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = async (req, res, next) => {
  const users = await User.find({});
  req.user = users[0];
  next();
};
