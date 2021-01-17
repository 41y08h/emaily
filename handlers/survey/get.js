const Survey = require("../../models/Survey");

/** Respond with an array of surveys of the currentuser excluding recipients field */
module.exports = async (req, res) => {
  res.send(await Survey.find({ _user: req.user.id }, "-recipients"));
};
