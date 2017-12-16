const dbConnection = require(".../config/mongoConnection");
var Schema = dbConnection.Schema;

var menuSchema   = new Schema({

    id: {type: Number},
    title: {type: String},
    description: {type: String},
    price: {type: Number}
});
module.exports = menuSchema;