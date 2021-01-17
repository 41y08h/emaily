const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const path = require("path");
const router = require("../routes");
const keys = require("../config/keys");

/** Common express app config */
function common(app) {
  app.use(express.json());
  app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [keys.cookieKey],
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use("/api", router);
}

/** Environment based config for development */
function development(app) {
  if (process.env.NODE_ENV === "production") return;
  app.use(require("../middlewares/loginDevUser"));
}

/** Environment based config for production */
function production(app) {
  if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }
}

module.exports = {
  development,
  production,
  common,
};
