import React, { Component } from 'react';
import Square from './Square'


class Board extends Component {
    constructor(props){
        super(props)
        this.state = {
            board: Array(100).fill(null),
            id: 1,
            mines: [0, 1, 2, 10, 12, 20, 21, 22, 33, 44, 55, 66]
        }
    }

    playerTurn = (id) => {
      let { board, mines } = this.state
      let move = board
      console.log(board[id]);
        if (mines.includes(id)) {
          console.log("gameover");
          move[id] = "mine"
        } else if (board[id] == null) {
          let counter = 0
            let sroundingSquares = [id-11, id-10, id-9, id-1, id+1, id+9, id+10, id+11]
            for (let i = 0; i < sroundingSquares.length; i++) {
              if (mines.includes(sroundingSquares[i])) {
                counter ++
              }
            }
          console.log(counter);
          move[id] = counter
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
