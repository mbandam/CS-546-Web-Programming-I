const dbConnection = require("../config/mongoConnection");
var menuSchema = require('./schemas/menuSchema.js');
var fs = require('fs');
var menuData = fs.readFileSync('./products.json');
var Menu = dbConnection.model('Menu',menuSchema);

let exportedMethods = {
     menuAdd: () => {
        Menu.find().remove();
        for( var i = 0; i < menuData.length; i++ ) {
            new Menu( menuData[ i ] ).save();
        }
        console.log(Menu);
        return Menu;
    }
}

module.exports = exportedMethods;