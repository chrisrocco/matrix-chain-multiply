/*
*
* Create Node: makeNode( label )
* Make Edge: makeEdge( from_node, to_node ) - uses object references
*
* */
var count = 0;
var masterNodesList = [];
var masterEdgeList = [];

function makeNode(label){
    count++;
    var node = {
        id: count,
        label: label
    };
    masterNodesList.push(node);
    return node;
}
function makeEdge(nodeA, nodeB){
    var edge = {
        from: nodeA.id,
        to: nodeB.id,
        arrows: "to"
    };
    masterEdgeList.push(edge);
    return edge;
}

function render(divID){
    var nodes = new vis.DataSet(masterNodesList);
    var edges = new vis.DataSet(masterEdgeList);

    var container = document.getElementById(divID);
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {
        layout: {
            hierarchical: {
                sortMethod: "directed"
            }
        },
        // nodes: {
        //     shape: 'box'
        // },
        physics: {
            "enabled": true,
            "barnesHut": {
                "avoidOverlap": 0.5
            },
            "minVelocity": 0.75
        }
    };
    var network = new vis.Network(container, data, options);
}
function clear(){
    masterNodesList = [];
    masterEdgeList = [];
}