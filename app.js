// external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

// internal imports
const {
  notFoundPageHandler,
  defaultErrorHandler,
} = require("./middlewares/errors/errorHandlers");
const loginRouter = require("./routes/loginRouter");
const usersRouter = require("./routes/userRouter");
const inboxRouter = require("./routes/inboxRouter");

// app configuration
const app = express();
dotenv.config();

// connect mongoDB with mongoose
mongoose
  .connect(process.env.MONGO_SECRET)
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

// request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(`${__dirname}`, "/public")));

// cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup
app.use("/", loginRouter);
app.use("/inbox", inboxRouter);
app.use("/users", usersRouter);

// not found error handler
app.use(notFoundPageHandler);

// default error handler
app.use(defaultErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});
