const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;


let _db, storage, upload;

const mongoConnect = async (callback) => {
  MongoClient.connect(
    "mongodb+srv://viswa:1234@image.q6t7tbt.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((result) => {
      console.log("connected");
      _db = result.db();
      callback(result);
    })
    .catch((e) => {
      console.log(e);
    });
};
const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No Database found";
};


exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

