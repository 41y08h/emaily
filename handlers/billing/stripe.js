const keys = require("../../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);

module.exports = async (req, res) => {
  // Finalize payment
  await stripe.charges.create({
    amount: 500,
    currency: "inr",
    description: "Rs.500 for 5 In-App-Credits",
    source: req.body.id,
  });

  // Finalize credits to the user
  req.user.credits += 5;
  const user = await req.user.save();
  res.json(user.credits);
};
