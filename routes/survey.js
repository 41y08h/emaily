const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const isLoggedIn = require("../middlewares/isLoggedIn");
const hasCredits = require("../middlewares/hasCredits");
const Survey = mongoose.model("surveys");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/survey");

module.exports = (app) => {
  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for voting :)");
  });

  app.get("/api/surveys", isLoggedIn, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }, "-recipients");

    res.send(surveys);
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    const pattern = new Path("/api/surveys/:surveyId/:choice");

    _.chain(req.body)
      .map(({ url, email }) => {
        const match = pattern.test(new URL(url).pathname);
        if (match)
          return {
            ...match,
            email,
          };
      })
      .compact()
      .uniqBy("surveyId", "email")
      .each(({ surveyId, choice, email }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email, responded: false },
            },
          },
          {
            $inc: { [choice.toLowerCase()]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date(),
          }
        ).exec();
      })
      .value();

    res.send({});
  });

  app.post("/api/surveys", isLoggedIn, hasCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients
        .split(",")
        .map((email) => ({ email: email.trim() })),
      _user: req.user.id,
    });

    // Time to send emails
    const mailer = new Mailer(
      survey.recipients,
      survey.subject,
      surveyTemplate(survey)
    );

    try {
      await mailer.send();
      survey.dateSent = Date.now();
      await survey.save();

      // Charge user
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err.message);
    }
  });
};
