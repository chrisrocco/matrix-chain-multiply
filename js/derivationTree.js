window.ROWS = 0;
window.COLS = 1;



// matrix = [ n, n ]
function parse(matrixChain){
    if(matrixChain.length === 1){
        return {
            cost: 0,
            matrix: matrixChain[0]
        }
    }

    var minCumulativeCost = Infinity;
    var minInstanceCost = Infinity;
    var minNode = {  };
    for (var divider = 1; divider <= matrixChain.length - 1; divider++) {

        var leftGroup = matrixChain.slice(0, divider);
        var rightGroup = matrixChain.slice(divider, matrixChain.length);

        var leftResultMatrix = [ leftGroup[0][ROWS], leftGroup[leftGroup.length - 1][COLS] ];
        var rightResultMatrix = [ rightGroup[0][ROWS], rightGroup[rightGroup.length - 1][COLS] ];
        var instanceCost = costToMultiply(leftResultMatrix, rightResultMatrix);

        var leftNode = parse(leftGroup);
        var rightNode = parse(rightGroup);

        var cumulativeCost = instanceCost + leftNode.cost + rightNode.cost;

        var splitNode = {
            cost: cumulativeCost,
            left: leftNode,
            right: rightNode
        };

        if(cumulativeCost < minCumulativeCost){
            minCumulativeCost = cumulativeCost;
            minInstanceCost = instanceCost;
            minNode = splitNode;
        }
    }

    return minNode;
}
function costToMultiply(leftMatrix, rightMatrix){
    var cost = leftMatrix[ROWS] * leftMatrix[COLS] * rightMatrix[COLS];
    return cost;
}




var bookMatrixChain = [
    // from the book
    [ 30, 35 ],
    [ 35, 15 ],
    [ 15, 5 ],
    [ 5, 10 ],
    [ 10, 20 ],
    [ 20, 25 ],
]
function testParse(){
    var tree = parse(bookMatrixChain);
    console.log("TREE:", tree);
}