/** Express middleware for ensuring that a user has enough credits to proceed */
function hasCredits(req, res, next) {
  if (req.user.credits < 1)
    return res
      .status(403)
      .send({ message: "You need more credits to perform this operation." });

  next();
}

module.exports = hasCredits;
