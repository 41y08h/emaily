const router = require("express").Router();
const auth = require("./auth");
const billing = require("./billing");
const survey = require("./survey");

router.use("/auth", auth);
router.use("/billing", billing);
router.use("/survey", survey);

module.exports = router;
