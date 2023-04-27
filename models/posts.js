const getDb = require("../utils/database").getDb;
const mongodb = require("mongodb");
const { GridFsStorage } = require("multer-gridfs-storage");
const multer = require("multer");

class Post {
  constructor(userId, userName, icon, posted, file, likes, description, id) {
    this.userId = userId;
    this.userName = userName;
    this.icon = icon;
    this.posted = posted;
    this.file = file;
    this.likes = likes;
    this.description = description;
    this._id = id ? new mongodb.ObjectId(id) : null;
  }
  save() {
    const db = getDb();
    let mongoFunc;
    if (this._id) {
      mongoFunc = db
        .collection("posts")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      mongoFunc = db.collection("posts").insertOne(this);
    }
    return mongoFunc.then().catch((e) => {
      console.log(e);
    });
  }
  static fetchAll() {
    const db = getDb();
    return db
      .collection("posts")
      .find()
      .toArray()
      .then((posts) => {
        return posts;
      })
      .catch((e) => {
        console.log(e);
      });
  }
  static fetchFile(file, cb) {
    const db = getDb();
    const collection = db.collection("uploads.files");
    const collectionChunks = db.collection("uploads.chunks");
    return collection.find({ filename: file }).toArray((err, docs) => {
      if (!docs || docs.length === 0) {
        null;
      }
      collectionChunks
        .find({ files_id: docs[0]._id })
        .sort({ n: 1 })
        .toArray((err, chunks) => {
          if (!chunks || chunks.length === 0) {
            return null;
          }
          let fileData = [];
          for (let i = 0; i < chunks.length; i++) {
            fileData.push(chunks[i].data.toString("base64"));
          }
          let finalFile =
            "data:" + docs[0].contentType + ";base64," + fileData.join("");
          cb(finalFile);
        });
    });
  }
  static updateLike(id, likes) {
    const db = getDb();
    return db.collection("posts").updateOne(
      { _id: mongodb.ObjectId(id) },
      { $set: { likes: likes } }
    );
  }
}
module.exports = Post;
