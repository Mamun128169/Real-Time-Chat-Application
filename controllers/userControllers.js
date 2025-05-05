// get login page
const getUsers = (req, res, next) => {
  console.log("users");
  res.render("users", {
    title: "Users - Chat Application",
  });
};

module.exports = {
  getUsers,
};
