import React from "react";

export default function Dijkstra(startNode, endNode, grid) {
  var visited = [];
  var unvisited = [];
  const distance = [];
  var found = false;
  const visitedNodeinOrder = [];
  for (let row = 0; row < 20; row++) {
    const currentrow = [];
    const visitedrow = [];
    for (let col = 0; col < 50; col++) {
      currentrow.push(Infinity);
      visitedrow.push(false);
      unvisited.push(grid[row][col]);
    }
    distance.push(currentrow);
    visited.push(visitedrow)
  }
  distance[startNode.row][startNode.col] = 0;
  while (unvisited.length > 0 && !found) {
    const currentNode = findCurrentNodeWithMinDist(unvisited,distance);
    visitedNodeinOrder.push(currentNode);
    if(currentNode === endNode) found = true;
    const Neighbors = FindNeighbors(currentNode, visited);
    Neighbors.forEach((NeighborNode) => {
      const NewTentativeDistance = distance[currentNode.row][currentNode.col] + 1
        if (distance[NeighborNode.row][NeighborNode.col] > NewTentativeDistance){
            distance[NeighborNode.row][NeighborNode.col] = NewTentativeDistance;
            grid[NeighborNode.row][NeighborNode.col].previousNode = currentNode;
        }         
    });
    visited[currentNode.row][currentNode.col] = true;
    unvisited = unvisited.filter(node => ((node.row !== currentNode.row) || (node.col !== currentNode.col)))
  };
  return visitedNodeinOrder;
}

function findCurrentNodeWithMinDist(Nodes,distance){
    var min = Infinity;
    let MinNode;
    Nodes.forEach(node => {
        if (distance[node.row][node.col] < min){
            min = distance[node.row][node.col];
            MinNode = node;
        }
    });
    return MinNode;

}

function FindNeighbors(node, visited) {
  const r = node.row,
    c = node.col;
  const Neighbors = [];
  if(((r - 1) >= 0) && !visited[r - 1][c]){
     Neighbors.push({ row: r - 1, col: c })
  }
    
  if(((c - 1) >= 0) && !visited[r][c - 1]){
     Neighbors.push({ row: r, col: c - 1 })
  }

  if(((r + 1) <= 19) && !visited[r + 1][c]){
     Neighbors.push({ row: r + 1, col: c })
  }
  if(((c + 1) <= 49) && !visited[r][c + 1]){
     Neighbors.push({ row: r, col: c + 1 })
  }
  return Neighbors;
}

//Testing Dijkstra
// const number = 5;
// const nodes = [];
// for (let row = 0; row < 25; row++) {
//   const currentrow = [];
//   for (let col = 0; col < 50; col++) {
//     const currentNode = {
//       col,
//       row,
//       isStart: row === 10 && col === 15,
//       isFinish: row === 10 && col === 25,
//       previousNode : null
//     };
//     currentrow.push(currentNode);
//   }
//   nodes.push(currentrow);
// }
// var startNode, endNode;
// nodes.forEach((row) => {
//   row.forEach((node) => {
//     if (node.isStart) startNode = node;
//     else if (node.isFinish) endNode = node;
//   });
// });
// const visitedNodeinOrder = (Dijkstra(startNode, endNode, nodes));
// const NodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
// console.log(visitedNodeinOrder)
// console.log(NodesInShortestPathOrder)

export function getNodesInShortestPathOrder(finishNode){
    const NodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null){
        NodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return NodesInShortestPathOrder;
}
