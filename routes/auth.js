const router = require("express").Router();
const logout = require("../handlers/auth/logout");
const currentuser = require("../handlers/auth/currentuser");
const googleAuth = require("../handlers/auth/google");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/google", googleAuth.main());
router.get("/google/callback", googleAuth.middle(), googleAuth.final());

router.get("/logout", isLoggedIn, logout);
router.get("/currentuser", isLoggedIn, currentuser);

module.exports = router;
