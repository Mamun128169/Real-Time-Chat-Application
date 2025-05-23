const createError = require("http-errors");

// not found page handler
const notFoundPageHandler = (req, res, next) => {
  next(createError(404, "Your requested content was not found!"));
};

// default error handler
const defaultErrorHandler = (err, req, res, next) => {
  res.locals.error =
    process.env.NODE_ENV === "development" ? err : { message: err.message };

  res.status(err.status || 500);

  if (!res.locals.html) {
    // html response
    res.render("error", {
      title: "Error Page",
    });
  } else {
    // json response
    res.json(res.locals.error);
  }
};

// module exports
module.exports = {
  notFoundPageHandler,
  defaultErrorHandler,
};
