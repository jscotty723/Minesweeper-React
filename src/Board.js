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

    rightClick = (id) => {
        let { board } = this.state
        let move = board
            if (board[id] === null) {
                move[id] = "F"
            }
        console.log("right click");
        this.setState({
          board: move
        })

    }

    playerTurn = (id) => {
      let { board, mines } = this.state
      let move = board
        if (mines.includes(id)) {
          move[id] = "M"
        } else if (board[id] == null) {
          let counter = 0
          const num = id
          let str = num.toString()
          let lastDigit = str.charAt(str.length-1)
          const surroundingSquaresIfNine = [id-11, id-10, id-1, id+9, id+10]
          const surroundingSquares = [id-11, id-10, id-9, id-1, id+1, id+9, id+10, id+11]
            if (lastDigit === "9") {
              for (let i = 0; i < surroundingSquaresIfNine.length; i++) {
                if (this.state.mines.includes(surroundingSquaresIfNine[i])) {
                  counter ++
                }
              }
            } else if (lastDigit !== "9") {
              for (let i = 0; i < surroundingSquares.length; i++) {
                if (this.state.mines.includes(surroundingSquares[i])) {
                  counter ++
                }
              }
            }
          move[id] = counter
        }
        console.log(move);
        this.setState({
          board: move
        })
    }


  render() {
    return (
      <div id="board">
        {this.state.board.map((el, i) => {
            return <Square playerTurn={this.playerTurn} rightClick={this.rightClick} arrayVal={el} index={i}/>
        })
        }
      </div>
    );
  }
}

export default Board;
