/* Function to count the occurances of each word, called by textMetrics */
function wordOccurances(text){
    let wordArray = text.split(" ");
    let wordOccuranceCount = wordArray.reduce(function (all , word){
        if(word in all) {
            all[word] ++;
        } else {
            all[word] = 1;
        }
        return all;
    },{});
    return wordOccuranceCount;
}

module.exports = {
    simplify: (text) => {
        if(!text) {
            throw "There is no text provided";
        }
        if (typeof text !== "string") {
			throw "Provided text should be of type string";
		}
        return text.toLowerCase().replace(/[^a-z0-9\s]/g,'').replace(/[\t\n\s]/g,' ');
    },
    createMetrics: (text) => {
        if(!text) {
            throw "There is no text provided";
        }
        if (typeof text !== "string") {
			throw "Provided text should be of type string";
        }
        // Simplifing the text
        text = module.exports.simplify(text);
        // Object for the metrics
        let metrics = new Object();
        // total number of letters in the simplified text
        metrics.totalLetters = text.match(/[a-z]/g).length;
        // total number of words in the simplified text
        metrics.totalWords = text.match(/\w+/g).length;
        // total number of unique words that appear in the simplified text
        metrics.uniqueWords = Object.keys(wordOccurances(text)).length;
        // number of words in the text that are 6 or more letters long
        metrics.longWords = text.match(/\w{6,}/g).length;
        // the average number of letters in a word in the text
        metrics.averageWordLength = (metrics.totalLetters / metrics.totalWords).toFixed();
        // a dictionary of each word and how many times each word occurs in the text
        metrics.wordOccurrences = wordOccurances(text);
        return metrics;
    }
}