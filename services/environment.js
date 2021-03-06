const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const router = require("../routes");
const keys = require("../config/keys");
const compression = require("compression");

/** Common express app config */
function common(app) {
  app.use(compression());
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
    const root = require("path").join(__dirname, "../client", "build");
    app.use(express.static(root));
    app.get("*", (req, res) => {
      res.sendFile("index.html", { root });
    });
  }
}

module.exports = {
  development,
  production,
  common,
};
