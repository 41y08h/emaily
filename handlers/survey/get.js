const Survey = require("../../models/Survey");

module.exports = async (req, res) => {
  res.send(await Survey.find({ _user: req.user.id }, "-recipients"));
};
