;
const Storage = require("../models/storage").Storage;


exports.addItem = (req, res, next) => {
  const storage = new Storage(req.body.title, req.body.description, req.body.url);
  storage
    .save()
    .then((result) => {
      res.redirect("/profile");
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.fetchAll = (req, res, next) => {
  Storage.fetchAll()
    .then((prods) => {
      let logStatus = logStatusFunc();
      let user = userCall();
      res.render("check", {
        artworks: prods,
        title: "Profile",
        isLoggedIn: logStatus,
        user: user
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
