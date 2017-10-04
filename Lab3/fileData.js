const bluebird = require("bluebird");
const Promise = bluebird.Promise;
const fs = bluebird.promisifyAll(require("fs"));

module.exports = {
    /* Read file as string */
    getFileAsString: async function (path) {   
        if(!path) {
            throw "There is no path provided for the file";
        }
        if (typeof path !== "string") {
			throw "Given path should be string";
		}
        let fileAsString = await fs.readFileAsync(path,"utf-8");
        return fileAsString;
    },

    /* Read file as JSON */
    getFileAsJSON: async function (path) {
        if(!path) {
            throw "There is no path provided for the file";
        }
        if (typeof path !== "string") {
			throw "Given path should be string";
		}
        let fileContent = await fs.readFileAsync(path,"utf-8");
        let fileAsJson = JSON.parse(fileContent);
        return fileAsJson;
    },

    /* Writing text to file */
    saveStringToFile: async function(path, text){
        if(!path) {
            throw "There is no path provided for the file";
        }
        if (typeof path !== "string") {
			throw "Given path should be string";
        }
        if(!text) {
            throw "There is no text provided for the file";
        }
        if (typeof text !== "string") {
			throw "Given text should be string";
		}
        let stringToFile = await fs.writeFileAsync(path,text);
        return stringToFile;
    },

    /* Converting the object into JSON String */
    saveJSONToFile: async function(path, obj){
        if(!path) {
            throw "There is no path provided for the file";
        }
        if (typeof path !== "string") {
			throw "Given path should be string";
        }
        if(!obj) {
            throw "There is no object provided";
        }
        if (typeof obj !== "object") {
			throw "Given object should be of object type";
        }       
        let jsonToFile = await fs.writeFileAsync(path,JSON.stringify(obj,null,4));
        return jsonToFile;
    }
}