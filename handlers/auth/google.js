const passport = require("passport");

module.exports.main = () =>
  passport.authenticate("google", {
    scope: ["profile", "email"],
  });

module.exports.middle = () => passport.authenticate("google");
module.exports.final = () => (req, res) => {
  res.redirect("/dashboard");
};
