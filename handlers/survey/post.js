const Survey = require("../../models/Survey");
const Mailer = require("../../utils/Mailer");
const surveyTemplate = require("../../templates/survey");

/** Handler for creating a new survey */
module.exports = async (req, res) => {
  const { title, subject, body, recipients } = req.body;
  return res.status(400).send("An error occurred!");
  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipients.split(",").map((email) => ({ email: email.trim() })),
    _user: req.user.id,
  });

  try {
    // Time to send emails
    const mailer = new Mailer(
      survey.recipients,
      survey.subject,
      surveyTemplate(survey)
    );

    await mailer.send();
    survey.dateSent = Date.now();
    const saved = await survey.save();

    // Charge user
    req.user.credits -= 1;
    const { credits } = await req.user.save();

    res.json({ survey: saved, credits });
  } catch ({ message }) {
    res.status(422).send(message);
  }
};
