const fileData = require("./fileData.js");
const textMetrics = require("./textMetrics.js");
const blueBird = require("bluebird");
const Promise = blueBird.Promise;
const fs = blueBird.promisifyAll(require("fs"));

async function callFunction(i) {
    const checkingFile = fs.existsSync(`./chapter${i}.result.json`);
    if(checkingFile){
        try {
            const fileJSON = await fileData.getFileAsJSON(`./chapter${i}.result.json`);
            console.log(fileJSON);
        } catch (error) {
            console.log(error);
        }     
    } else {
        try {
            let fileString = await fileData.getFileAsString(`./chapter${i}.txt`);
            fileString = textMetrics.simplify(fileString);
            await fileData.saveStringToFile(`chapter${i}.debug.txt`,fileString);
            let metricResult = textMetrics.createMetrics(fileString);
            await fileData.saveJSONToFile(`chapter${i}.result.json`,metricResult);
            console.log(`chapter${i} metric results :`);
            console.log(metricResult);
        } catch (error) {
            console.log(error);   
        }  
    }
}

/* Calling teh function to perform the action */
for (let i = 1; i < 4; i++){
	callFunction(i);
}
