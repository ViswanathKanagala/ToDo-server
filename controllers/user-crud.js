const User = require("../models/user").user;

exports.addUser = (req, res, next) => {
  if (req.body.name.length < 4) {
    
  }
  else {
    const user = new User(
      req.body.name,
      req.body.email,
      req.body.password,
      req.body.country,
      req.body.gender,
      req.body.dob,
      req.body.type
    );
    user
      .save()
      .then((result) => {
        update(
          {
            username: req.body.name,
            email: req.body.email,
            country: req.body.country,
            gender: req.body.gender,
            dob: req.body.dob,
            userType: req.body.type,
          },
          true
        );
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
exports.updateUser = (req, res, next) => {
  let usernow = currentUser();
  const user = new User(
    req.body.name ? req.body.name : usernow.username,
    req.body.mail ? req.body.mail : usernow.email,
    usernow.password,
    req.body.country ? req.body.country : usernow.country,
    req.body.gender ? req.body.gender : usernow.gender,
    req.body.dob ? req.body.dob : usernow.dob,
    req.body.type ? req.body.type : usernow.userType,
    usernow._id
  );
  user
    .save()
    .then()
    .catch((e) => console.log(e));
  update(
    {
      username: req.body.name ? req.body.name : usernow.username,
      email: req.body.mail ? req.body.mail : usernow.email,
      country: req.body.country ? req.body.country : usernow.country,
      gender: req.body.gender ? req.body.gender : usernow.gender,
      dob: req.body.dob ? req.body.dob : usernow.dob,
      userType: req.body.type ? req.body.type : usernow.userType,
      _id: usernow._id,
    },
    false
  );
  res.redirect("/profile");
};
