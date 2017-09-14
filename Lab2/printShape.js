function checkIsProperNumber(num, functionName) {
    if(num === undefined || typeof num != 'number') {
        throw `${num} is not a number`;
    }
    if (functionName === "square") {
        if(num < 2) {
            throw `square: ${num} is out of bounds`;
        }  
    } else if (functionName === "triangle") {
        if(num < 1) {
            throw `triangle: ${num} is out of bounds`;
        }
    } else {
        if(num % 2 != 0) {
            throw `Rhombus can not be formed with ${num}, as it is a odd number`;
        }
        if(num < 1) {
            throw `rhombus: ${num} is out of bounds`;
        }
    }
}

module.exports = {
    printSquare: (num) => {
        checkIsProperNumber(num, "square");
        for (let i=1; i<=num; i++) {
            let row = "";
            for(let j=1; j<=num; j++) {
                if (i == 1 || i == num) row += "-";
                else row += " "; 
            }
            console.log(`\t|${row}|`);
        }
        console.log("\n");
    },

    printTriangle: (num) => {
        checkIsProperNumber(num, "triangle");
        for(let i=0; i<num; i++){
            let row = "";
            for(let j=num-1; j>i; j--){
                row += " ";
            }
            row += "/";
            for(let k=0; k<i*2; k++){
                if (i === num -1) {
                    row += "-";
                }
                else {
                     row += " ";
                }
            }
            row += "\\";
            console.log(row);
        }
        console.log("\n");       
    },

    printRhombus: (num) => {
        checkIsProperNumber(num, "rhombus");
        for(let i=0; i<num/2; i++){
            let row = "";
            for(let j=num/2-1; j>i; j--){
                row += " ";
            }
            row += "/";
            for(let j=0; j<i*2+1; j++){
                if (i === 0) {
                    row += "-";
                }
                else {
                    row += " ";
                }
            }
            row += "\\";
            console.log(row);
        }
        for(let i=0; i<num/2; i++){
            let row = "";
            for(let j=0; j<i; j++){
                row += " ";
            }
            row += "\\";
            for(let k=0; k<(num/2-i)*2-1; k++){
                if (i === num/2-1) {
                    row += "-";
                }
                else {
                    row += " ";
                }
            }
            row += "/";
            console.log(row);            
        }
        console.log("");
    }
};