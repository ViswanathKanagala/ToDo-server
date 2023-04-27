const getDb = require("../utils/database").getDb;

class Admin {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
  save() {
    const db = getDb();
    return db
      .collection("admins")
      .insertOne(this)
      .then((res) => {
        return res;
      });
  }
  static login(username, password) {
    const db = getDb();
    return db
      .collection("admins")
      .findOne({ username: username, password: password })
      .then((res) => {
        return res;
      });
  }
  static fetchAll() {
    const db = getDb();
    return db
      .collection("admins")
      .find()
      .toArray()
  }
}

module.exports = Admin;
