const User = require("../models/user").user;

exports.logUser = (req, res, next) => {
  User.findUser(req.body.email)
    .then((result) => {
      if (result.password === req.body.pass) {
        req.session.user = result;
        res.send({status: true, user: result})
      } else {
         res.status(401).send({succcess: false}) 
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.logOut = (req, res, next) => {
  update({}, true);
  res.redirect("/");
};

exports.register = (req, res, next) => {
  let user = { ...req.body };
  console.log(user);
  let newUser = new User(user.name, user.email, user.pass, user.ph);
  newUser.save().then((response) => {
    res.send({response, done: 1});
  });
};

exports.updateUser = ((req, res, next) => {
  let user = { ...req.body };
  console.log(req.body);
  let userObj = new User(user.username, user.email, user.password, user.mobile, user.id);
  userObj.save()
  .then((response) => {
    console.log(response);
    res.send({"success": true});
  })
})

exports.displayUsers = (req, res, next) => {
  User.fetchAll()
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      console.log(e);
    });
}
