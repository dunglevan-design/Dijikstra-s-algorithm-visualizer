import React, { Component } from "react";
import Node from "./Node/Node";
import Dijkstra, { getNodesInShortestPathOrder } from "../algorithms/dijsktra";

import "./PathfindingVisualizer.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid: grid });
  }
  animateDijkstra(visitedNodesInOrder, NodesInShortestPathOrder){
    for (let i = 1; i <= visitedNodesInOrder.length-1; i++) {
       if (i === visitedNodesInOrder.length-1){
         setTimeout(() => {
          this.animateShortestPath(NodesInShortestPathOrder);
         },10*i)
         return;                   
       }
       setTimeout(() => {
         const node = visitedNodesInOrder[i];
         document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited'
       },10*i)
    }
  }
  animateShortestPath(NodesInShortestPathOrder){
    for (let i = 1; i < NodesInShortestPathOrder.length-1; i++){
      setTimeout(() => {
        const node = NodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-onPath'
      }, 50*i)
    }

  }

  visualizeDijkstra(){
    const grid = this.state.grid;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = Dijkstra(startNode, finishNode, grid);
    const NodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, NodesInShortestPathOrder);
  }

  render() {
    const { grid } = this.state;
    let gridtorender;
    if (grid) {
      gridtorender = grid.map((row, rowIdx) => {
        return (
          <div key={rowIdx}>
            {row.map((node, nodeIdx) => {
              const { isStart, isFinish } = node;
              return (
                <Node
                  key={nodeIdx}
                  isStart={isStart}
                  isFinish={isFinish}
                  row = {rowIdx}
                  col = {nodeIdx}
                ></Node>
              );
            })}
          </div>
        );
      });
    }
    return (
      <div>
        <button onClick = {() => this.visualizeDijkstra()}>Visualize</button>

        <div className="grid">{gridtorender}</div>
    </div>);
  }
}


const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col,row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    previousNode: null,
  }
} 
