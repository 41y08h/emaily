const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const stripeHandler = require("../handlers/billing/stripe");

router.post("/stripe", isLoggedIn, stripeHandler);

module.exports = router;
