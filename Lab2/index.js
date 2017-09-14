const printShape = require("./printShape");

for(let i = 1; i<= 10; i++) {
    printShape.printTriangle(i);
}

for(let i = 2; i<= 11; i++) {
    printShape.printSquare(i);
}

for(let i = 2; i<= 22; i += 2) {
    printShape.printRhombus(i);
}
