const express = require("express");
const router = express.Router();
const userController = require("../controllers/log");
const register = require("../controllers/log").register;
const addItem = require("../controllers/storage").addItem;
const fetchAll = require("../controllers/storage").fetchAll;
const postControllers = require("../controllers/posts");
const { GridFsStorage } = require("multer-gridfs-storage");
const multer = require("multer");
require("dotenv").config()

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    console.log(req);
    const random = Math.floor(Math.random() * 10000);
    return {
      bucketName: "uploads",
      filename: file.originalname + random,
    };
  },
});

let gfs;

const upload = multer({ storage });

router.get("/profile", fetchAll);

router.get("/view", userController.displayUsers);

router.post("/login", userController.logUser);

router.get("/logout", userController.logOut);

router.post("/updateuser", userController.updateUser);

router.post("/additem", addItem);

router.post("/register", register);

router.post("/post", upload.single("file"), postControllers.savePost);

router.get("/post/:fileName", postControllers.fetchFile);

router.get("/posts", postControllers.getPosts);

router.get('/post/updatelike/:id', postControllers.updateLike)




module.exports = router;
