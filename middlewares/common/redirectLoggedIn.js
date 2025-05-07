const { signedCookies } = require("cookie-parser");

const redirectLoggedIn = (req, res, next) => {
  const cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

  if (!cookies) {
    next();
  } else {
    res.redirect("/inbox");
  }
};

module.exports = redirectLoggedIn;
