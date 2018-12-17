import React, { Component } from 'react';
import Square from './Square'


class Board extends Component {
    constructor(props){
        super(props)
        this.state = {
            gameWon: true,
            board: Array(100).fill(-1),
            id: 1,
            mines: [],
            minesLeft: 0
        }
    }

    plantMines(num) {
        let mineField = Array(num).fill(null)
        mineField.map((el, i) => {
            let tempMine = Math.floor(Math.random() * (99))
            if (mineField.includes(tempMine)) {
                return tempMine = Math.floor(Math.random() * (99))
            } else {
                return mineField[i] = tempMine
            }
        })
        this.setState({
            mines: mineField,
            gameWon: false,
            board: Array(100).fill(-1),
            minesLeft: num
        })
    }

    rightClick = (id) => {
        let { board, gameWon, minesLeft } = this.state
        let mineCount = minesLeft
        let move = board
        if (gameWon === false) {
            if (board[id] === -1) {
                move[id] = 9
                mineCount -= 1
            } else if (board[id] === 9) {
                move[id] = "?"
                mineCount += 1
            } else if (board[id] === "?") {
                move[id] = -1
            }
            this.setState({
                board: move,
                minesLeft: mineCount
            })
        }
    }

    playerTurn = (id) => {
        let { board, mines, gameWon } = this.state
        let move = board
        let gameOver = gameWon
        // validating gamestate not won //
        if (gameWon === false) {
            // if click hits a mine //
            if (mines.includes(id)) {
                move[id] = 10
                gameOver = true
                this.gameLost(id)
            } else if (board[id] === -1) {
                let counter = 0
                const num = id
                let str = num.toString()
                let lastDigit = str.charAt(str.length-1)
                const surroundingSquaresIfNine = [id-11, id-10, id-1, id+9, id+10]
                const surroundingSquares = [id-11, id-10, id-9, id-1, id+1, id+9, id+10, id+11]
                // if
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
            this.setState({
              board: move,
              gameWon: gameOver
            })
        }
    }

    gameLost(id) {
        let { mines, board } = this.state
        let tempBoard = board
        mines.map(el => {
            if(el !== id)
            return tempBoard[el] = 11
        })
        this.setState({
            board:tempBoard
        })
    }


    render() {
        console.log(this.state.mines);
        return (
            <main>
                <section className='startGameContainer'>
                    <div id='easyGame' className='startGame' onClick={() => this.plantMines(10)}>
                        Easy
                    </div>
                    <div id='intermediateGame' className='startGame' onClick={() => this.plantMines(20)}>
                        Intermediate
                    </div>
                    <div id='difficultGame' className='startGame' onClick={() => this.plantMines(35)}>
                        Difficult
                    </div>
                </section>
                <div>{this.state.minesLeft}</div>
                <div id="board">
                    {this.state.board.map((el, i) => {
                        return <Square playerTurn={this.playerTurn} rightClick={this.rightClick} arrayVal={el} index={i}/>
                    })
                    }
                </div>
            </main>
        );
    }
}

export default Board;
