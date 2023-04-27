const mongodb = require("mongodb");
const getDb = require("../utils/database").getDb;

class Items {
  constructor(title, artist, desc, url, itemDetails, id) {
    this.title = title;
    this.artist = artist;
    this.desc = desc;
    this.url = url;
    this.itemDetails = itemDetails;
    this._id  = id ? new mongodb.ObjectId(id) : null;
  }

  save() {
    const db = getDb();
    let mongoFunc;
    if (this._id) {
      mongoFunc = db
        .collection("auctionItems")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      mongoFunc = db.collection("auctionItems").insertOne(this);
    }
    return mongoFunc.then().catch((e) => {
      console.log(e);
    });
  }
  static fetchAll() { 
    const db = getDb();
    return db
      .collection("auctionItems")
      .find()
      .toArray()
      .then((items) => {
        return items;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static findById(prodId) {
    const db = getDb();
    return db
      .collection("auctionItems")
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then((item) => {
        return item;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Items;
