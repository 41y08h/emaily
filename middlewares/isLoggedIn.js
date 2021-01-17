/** Express middleware for ensuring that a user is logged in */
function isLoggedIn(req, res, next) {
  if (!req.user)
    return res
      .status(401)
      .json({ message: "You are not authorized to perform this operation." });

  next();
}

module.exports = isLoggedIn;
