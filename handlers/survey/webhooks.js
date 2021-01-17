const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const Survey = require("../../models/Survey");

/** Handler for managing webhooks requests from Sendgrid servers */
module.exports = (req, res) => {
  const pattern = new Path("/api/survey/:id/:choice");

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
};
