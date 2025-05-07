// external imports
const bcrypt = require("bcrypt");
const { unlink } = require("fs");
const path = require("path");

// internal imports
const User = require("../models/usersModel");

// get users page
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.render("users", {
      users: users,
      title: "Users - Chat Application",
    });
  } catch (err) {
    next(err);
  }
};

// add user
const addUser = async (req, res, next) => {
  try {
    let newUser;

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    if (req.files && req.files.length > 0) {
      newUser = new User({
        ...req.body,
        avatar: req.files[0].filename,
        password: hashedPassword,
      });
    } else {
      newUser = new User({
        ...req.body,
        password: hashedPassword,
      });
    }

    // save the user
    await newUser.save();

    res.status(201).json({
      message: "User was added successfully!",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown error occurred!",
        },
      },
    });
  }
};

// remove user
const removeUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    // remove user avatar if any
    if (user.avatar) {
      unlink(
        path.join(__dirname, `../public/uploads/avatars/${user.avatar}`),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }

    res.status(200).json({
      message: "User was removed successfully",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Could not delete the user!",
        },
      },
    });
  }
};

module.exports = {
  getUsers,
  addUser,
  removeUser,
};
