const MongoClient = require("mongodb").MongoClient;;
const settings = require("./settings");

let fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;
let _connection = undefined

let connectDb = async () => {
    /* This will allow us to have one reference to DB connection per app */
    if (!_connection) {
        try {
            _connection = await MongoClient.connect(fullMongoUrl);
        } catch (e) {
            console.log("Exception -" + e);
        }
    }
    return _connection;
};

module.exports = connectDb;