var matrixInput = document.getElementById("matrixInput");
matrixInput.value = "30 x 35 | 35 x 15 | 15 x 5 | 5 x 10 | 10 x 20 | 20 x 25";
matrixInput.onkeyup = function(){
    var matrix = parseToMatrix(matrixInput.value);
    if(matrix){
        $(matrixInput).css("border-color", "green");
    } else {
        $(matrixInput).css("border-color", "red");
    }
};

var parseButton = document.getElementById("parseButton");
parseButton.onclick = function(){
    var matrixChain = parseToMatrix(matrixInput.value);
    if(!matrixChain){
        alert("Invalid input. Check your syntax.");
        return;
    }

    tree = parse(matrixChain);
    build(tree);
    render("tree");
    clear();
}

var tree;
function parseToMatrix(string){
    var matrixChain = [];

    var matrixStrings = string.split(" | ");
    for (var i = 0; i < matrixStrings.length; i++) {
        var temp = matrixStrings[i].split("x");
        var rows = parseInt(temp[0]);
        var cols = parseInt(temp[1]);

        if(!(Number.isInteger(rows) && Number.isInteger(cols))){
            return false;
        }

        matrixChain.push([ rows, cols ]);
    }

    return matrixChain;
}

/* Traversal */
function build(node, parent){
    if(!parent){
        var parent = makeNode("ROOT");
    }

    if(node.matrix){
        var leaf = makeNode(node.matrix);
        node.gui = leaf;
        makeEdge(parent, leaf);
    } else {
        var link = makeNode("S");
        node.gui = link;
        makeEdge(parent, link);
        build(node.left, link);
        build(node.right, link);
    }
}
/* Traversal */

/* Multiply */
function multiply(node){
    if(node.matrix){
        return node.matrix;
    }

    var current = getResultingMatrix(multiply(node.left), multiply(node.right));
    node.gui.label = current;

    return current;
}
function getResultingMatrix(leftMatrix, rightMatrix){
    return [ leftMatrix[0], rightMatrix[1] ];
}
/* Multiply */