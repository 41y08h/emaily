const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const isLoggedIn = require("../middlewares/isLoggedIn");

module.exports = (app) => {
  app.post("/api/stripe", isLoggedIn, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "inr",
      description: "500 bucks for 5 credits",
      source: req.body.id,
    });

    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
};
