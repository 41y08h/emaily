const router = require("express").Router();
const responseHandler = require("../handlers/survey/response");
const webhooksHandler = require("../handlers/survey/webhooks");
const surveysGet = require("../handlers/survey/get");
const surveyPost = require("../handlers/survey/post");
const isLoggedIn = require("../middlewares/isLoggedIn");
const hasCredits = require("../middlewares/hasCredits");

router.get("/api/survey/:id/:choice", responseHandler);
router.post("/survey/webhooks", webhooksHandler);

router.get("/", isLoggedIn, surveysGet);
router.post("/", isLoggedIn, hasCredits, surveyPost);

module.exports = router;
