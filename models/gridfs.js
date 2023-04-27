const getDb = require("../utils/database").getDb;
const multer = require("multer");
const {GridFsStorage} = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const crypto = require("crypto");
const mongo = require("mongodb");
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


const mongoUrl = "mongodb+srv://viswa:1234@image.q6t7tbt.mongodb.net/?retryWrites=true&w=majority";
const connection = mongoose.createConnection(mongoUrl);

let gfs;
connection.once('open', () => {
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection('uploads');
})

const storage =  GridFsStorage({
  url: "mongodb+srv://viswa:1234@image.q6t7tbt.mongodb.net/?retryWrites=true&w=majority",
  file: (req, file) => {
    console.log(file);
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({storage: storage});

router.post('/uploadSave', upload.single('file'), (req, res, next) => {
  res.json({file: req.file, s: 's'});
})

exports.storage = storage;
exports.imgrouter = router;