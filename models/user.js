const getDb = require("../utils/database").getDb;
const mongodb = require("mongodb");

class User {
  constructor(username, email, password, mobile, id) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.mobile = mobile;
    this._id = id ? new mongodb.ObjectId(id) : null;
  }
  save() {
    const db = getDb();
    let mongoFunc;
    if (this._id) {
      mongoFunc = db
        .collection("users")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      mongoFunc = db.collection("users").insertOne(this);
    }
    return mongoFunc.then().catch((e) => {
      console.log(e);
    });
  }
  static validate() {}
  static fetchAll() {
    const db = getDb();
    return db
      .collection("users")
      .find()
      .toArray()
      .then((users) => {
        return users;
      });
  }
  static findUser(email) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ email: email })
      .then((user) => {
        return user;
      })
      .catch((e) => {
        console.log(e);
      });
  }
  static findUsers(id) {
    const db = getDb();
    let _iid = new mongodb.ObjectId(id);
    return db
      .collection("users")
      .findOne({ _id: _iid })
      .then((user) => {
        return user;
      })
      .catch((e) => {
        console.log(e);
      });
  }
}

exports.user = User;
