import React, { Component } from 'react';
import Square from './Square'


class Board extends Component {
    constructor(props){
        super(props)
        this.state = {
            board: Array(100).fill(null),
            id: 1,
            mines: [0, 1, 2, 3, 4, 5, 6]
        }
    }

    playerTurn = (id) => {
      let { board, mines } = this.state
      let move = board
      console.log(id);
        if (mines.includes(id)) {
          console.log("mine");
          move[id] = 1
        } else if (board[id] == null) {
          console.log("null");
        }
        this.setState({
          board: move
        })
    }
  render() {
    return (
      <div id="board">
        {this.state.board.map((el, i) => {
            return <Square playerTurn={this.playerTurn} id={i}/>
        })
        }
      </div>
    );
  }
}

export default Board;


// <div className='board'>
//     {this.state.gameBoard.map((el, i) => (
//     <div onClick={() => this.playerClick(i)} style={{backgroundColor: this.displayColor(i)}} className='box i' id={i}>
// </div>
