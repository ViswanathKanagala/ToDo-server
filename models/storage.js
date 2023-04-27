const getDb = require("../utils/database").getDb;

class Storage {
  constructor(title, description, url) {
    this.title = title;
    this.description = description;
    this.url = url;
  }
  save() {
    const db = getDb();
    return db
      .collection("storage")
      .insertOne(this)
      .then()
      .catch((e) => {
        console.log(e);
      });
  }
  static fetchAll() {
    const db = getDb();
    return db
      .collection("storage")
      .find()
      .toArray()
      .then((items) => {
        return items;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

exports.Storage = Storage;
