/* Sum of the squares of 3 numbers passed */
let sumOfSquares = function (x,y,z) {
    if(typeof(x)==='number' && typeof(y)==='number' && typeof(z)==='number') {
        return x*x+y*y+z*z;
    } else {
        throw new datatypeException('sumOfSquares: Invalid data, number is expected');
     }
};

/* Say hello to the person given*/
function sayHelloTo(firstName, lastName, title) {
    if(firstName===null && lastName===null && title===null) {
    } else if(arguments.length) {
        if(arguments.length === 1 && typeof(firstName)==='string') {
            console.log(`Hello, ${firstName}!`);
        } else if(arguments.length === 2 && typeof(firstName)==='string' && typeof(lastName)==='string') {
            console.log(`Hello, ${firstName} ${lastName}. I hope you are having a good day!`);
        } else if(arguments.length === 3 && typeof(firstName)==='string' && typeof(lastName)==='string' && typeof(title)==='string') {
            console.log(`Hello, ${title} ${firstName} ${lastName}! Have a good evening!`);
        } else {
        throw new datatypeException('sayHelloTo: Invalid data, string is expected');
        }
    }
}

/* Cups of coffee song */
let cupsOfCoffee = (x) => {
    if(typeof(x)==='number') {
        let song = "";
        for (let i=x; i>0; i--){
           if(i !== 1){
               song += `${i} cups of coffee on the desk! ${i} cups of coffee!\nPick one up, drink the cup, ${i-1} cups of coffee on the desk!\n`;
           } else {
               song += `${i} cup of coffee on the desk! ${i} cup of coffee!\nPick it up, drink the cup, no more coffee left on the desk!`;
           }
       }
       return song;
    } else {
        throw new datatypeException('cupsOfCoffee: Invalid data, number is expected');
     }
    
};

/* Calculatingthe number of occureneces of substring in a given string */
let occurrencesOfSubstring = function(str1, str2) {
    if(typeof(str1)==='string' && typeof(str2)==='string') {
        position = 0;
        count = 0;
        while (position != -1)
        {
            position = str1.indexOf(str2,position);
            if (position != -1)
            {
                count++;
                position++;
            }
        }
        return count;
    } else {
        throw new datatypeException('occurrencesOfSubstring: Invalid data, string is expected');
     }
    
};

/* Randomizing the sentences in a given paragraph */
function randomizeSentences(paragraph) {
    if(typeof(paragraph)==='string') {
        var result = paragraph.match( /[^\.!]+[\.!]+/g );
        var currentIndex = result.length, temp, randomIndex;
        
          /* Function for Shuffle */
          while (0 !== currentIndex) {
        
            /* Picking teh remaining element */
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
        
            /* Swapping it woth the current element */
            temp = result[currentIndex];
            result[currentIndex] = result[randomIndex];
            result[randomIndex] = temp;
          }
        var randomParagraph = result.join("");
        return randomParagraph;
    } else {
        throw new datatypeException('randomizeSentences: Invalid data, string is expected');
     }
};

function datatypeException(message) {
    this.message = message;
    this.name = 'datatypeException';
}

exceptionMessages = [];

try {
    console.log("sumOfSquares:",sumOfSquares(5,3,4),"\n");
} catch(e) {
    exceptionMessages.push(e.message);
}

try {
    sayHelloTo();
} catch(e) {
    exceptionMessages.push(e.message);
}

try {
    sayHelloTo("Phil");
} catch(e) {
    exceptionMessages.push(e.message);
}

try {
    sayHelloTo("Phil", "Barresi");
} catch(e) {
    exceptionMessages.push(e.message);
}

try {
    sayHelloTo("Phil", "Barresi", "Mr.");
} catch(e) {
    exceptionMessages.push(e.message);
}

try {
    console.log("\n","cupsOfCoffee song:");
    console.log(cupsOfCoffee(5),"\n");
} catch(e) {
    exceptionMessages.push(e.message);
}

try {
    console.log("Numbner of occurences of substring: ",occurrencesOfSubstring("Helllllllo, class!", "ll"),"\n");
} catch(e) {
    exceptionMessages.push(e.message);
}

try {
    var paragraph = "Hello, world! I am a paragraph. You can tell that I am a paragraph because there are multiple sentences that are split up by punctuation marks. Grammar can be funny, so I will only put in paragraphs with periods, exclamation marks, and question marks -- no quotations.";
    console.log("Random paragraph:\n",randomizeSentences(paragraph),"\n");
} catch(e) {
    exceptionMessages.push(e.message);
}


console.log("Exceptions in data:\n",exceptionMessages);