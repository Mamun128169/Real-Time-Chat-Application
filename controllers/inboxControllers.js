// get login page
const getInbox = (req, res, next) => {
  res.render("inbox", {
    title: "Inbox - Chat Application",
  });
};

module.exports = {
  getInbox,
};
