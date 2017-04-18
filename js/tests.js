function testParseToMatrix(){
    var inputString = "5 x 10 | 10 x 20 | 20 x 15 | 15 x 10";
    var matrixChain = parseToMatrix(inputString);
    console.log("Input:", inputString);
    console.log("Result:", matrixChain);
}