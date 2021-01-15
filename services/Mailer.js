const sgMail = require("@sendgrid/mail");
const keys = require("../config/keys");
sgMail.setApiKey(keys.sendGridKey);

class Mailer {
  constructor(recipients, subject, body) {
    this.mail = {
      subject,
      to: recipients,
      from: "piyushsaharsa@gmail.com",
      html: body,
    };
  }

  send() {
    return sgMail.send(this.mail);
  }
}

module.exports = Mailer;
