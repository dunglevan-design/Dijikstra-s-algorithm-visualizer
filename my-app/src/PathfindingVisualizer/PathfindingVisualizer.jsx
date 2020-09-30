import React, { Component } from "react";
import Node from "./Node/Node";
import Dijkstra, { getNodesInShortestPathOrder } from "../algorithms/dijsktra";

import "./PathfindingVisualizer.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;
const WALL_NODE_ROW = 10;
const WALL_NODE_COL = 20;

export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseisPressed: false,
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
                  isWall = {node.isWall}
                  onMouseDown = {(row,col) => this.handleMouseDown(row,col)}
                  onMouseEnter = {(row,col) => this.handleMouseEnter(row,col)}
                  onMouseUp={(row,col) => this.handleMouseUp(row, col)}
                ></Node>
              );
            })}
          </div>
        );
      });
    }
    return (
      <div className = "Page">
        <button className = "button" onClick = {() => this.visualizeDijkstra()}>Visualize</button>

        <div className="grid">{gridtorender}</div>
    </div>);
  }
  handleMouseUp(row,col){
     this.setState({mouseisPressed: false})
  }
  handleMouseEnter(row,col){
    if(!this.state.mouseisPressed) return;
    const newGrid = GetNewGridWithWallToggled(this.state.grid, row, col)
    this.setState({grid: newGrid});
  }


  handleMouseDown(row,col){
    const newgrid = GetNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newgrid, mouseisPressed : true});
  }
  
}


const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 30; row++) {
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
    isWall: row === WALL_NODE_ROW && col === WALL_NODE_COL,
  }
} 
const GetNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const NewNode = createNode(col, row);
  NewNode.isWall = true;
  newGrid[row][col] = NewNode;
  return newGrid;
}
