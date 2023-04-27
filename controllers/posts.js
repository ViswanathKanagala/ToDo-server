const Post = require("../models/posts");

exports.getPosts = (req, res, next) => {
  Post.fetchAll()
    .then((posts) => {
      res.send(posts);
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.savePost = (req, res, next) => {
  const obj = req.body;
  console.log(obj);
  const userId = obj.userId;
  const userName = obj.userName;
  const icon = obj.icon;
  const posted = obj.posted;
  const file = req.file.filename;
  const likes = obj.likes;
  const description = obj.description;
  const post = new Post(
    userId,
    userName,
    icon,
    posted,
    file,
    likes,
    description
  );
  post
    .save()
    .then((result) => {
      res.send({
        sucess: true,
      });
    })
    .catch((e) => {
      res.send({
        sucess: false,
      });
      console.log(e);
    });
  next();
};

exports.fetchFile = (req, res, next) => {
  const fileName = req.params.fileName;
  Post.fetchFile(fileName, (file) => {
    res.send(file);
  });
};

exports.updateLike = (req, res, next) => {
  const id = req.params.id;
  const queries = req.query;
  Post.updateLike(id, queries.likes)
    .then((result) => {
      res.send("success");
    })
    .catch((e) => {
      console.log(e);
      res.send("failed");
    });
};
