import React, { Component } from 'react';
import Square from './Square'
import Stopwatch from './Stopwatch'

class Board extends Component {
    constructor(props){
        super(props)
        this.state = {
            gameWon: true,
            board: Array(64).fill(-1),
            answerKey: Array(64).fill(-1),
            id: 1,
            mines: [],
            minesLeft: 0,
            rowLength: 7,
            boardWidth: "280px",
            stopwatch: 999,
        }
    }

    incrementCounter() {
        this.setState({
            stopwatch: this.state.stopwatch + 1
        });
        this.startTimer = setTimeout(this.incrementCounter.bind(this), 1000);
    }

    stopStopwatch() {
        let time = this.state.stopwatch
        clearTimeout(this.startTimer)
        this.displayTimer(time)
    }

    displayTimer(time) {
        this.setState({
            stopwatch: time
        })
    }


    plantMines(mines, size) {
        this.stopStopwatch()
        let width = "280px"
        let rows = 8
        let mineField = Array(mines).fill(null)
        for (let i = 0; i < mineField.length; i++) {
            let tempMine = this.makeMines(size, mineField)
            mineField[i] = tempMine
        }
        if (size === 256) {
            rows = 16
            width = "550px"
        } else if (size === 420) {
            rows = 30
            width = "1040px"
        }

        this.incrementCounter()
        this.setState({
            mines: mineField,
            gameWon: false,
            board: Array(size).fill(-1),
            minesLeft: mines,
            boardWidth: width,
            rowLength: rows,
            stopwatch: 0
        })
    }

    makeMines = (size, mineField) => {
        let setMines = mineField
        let tempMine = Math.floor(Math.random() * (size-1))
        if (setMines.includes(tempMine)) {
            return this.makeMines(size, mineField)
        } else {
            return tempMine
        }
    }

    rightClick = (e, id) => {
        e.preventDefault()
        const { board, gameWon, minesLeft } = this.state
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
            } else {
                let adjacentSquares = this.adjacentChooser(id)
                for (let i = 0; i < adjacentSquares.length; i++) {
                    let box = adjacentSquares[i]
                    console.log(board[box]);
                    if (board[box] === -1) {
                        this.playerTurn(adjacentSquares[i])
                    }
                }
            }
            this.setState({
                board: move,
                minesLeft: mineCount,
            })
        }
    }

    playerTurn = (id) => {
        console.log("here");
        const { board, mines, gameWon } = this.state
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
                let counter = this.surroundingSquaresCounter(id)
                move[id] = counter
                if (counter === 0) {
                    this.clickedSquare(id)
                }
            }
            this.setState({
              board: move,
              gameWon: gameOver
            })
        }
    }

    revealBlankSpaces(id, array) {
        const { board } = this.state
        let spacesToSearch = array
        // let adjacentSquares = this.adjacentChooser(id)

        // for (let i = 0; i < adjacentSquares.length; i++) {
        //     const boardIndex = adjacentSquares[i]
        //     if (board[boardIndex] === -1 && (spacesToSearch.includes(adjacentSquares[i] === false))) {
        //         spacesToSearch.push(adjacentSquares[i])
        //     }
        // }

        for (let i = 0; i < spacesToSearch.length; i++) {
            let index = spacesToSearch[i]
            let value = this.surroundingSquaresCounter(index)
            // square value = 0, no bombs adjacient
            // (map value to surrouncing spaces) 1) open squares  2) add to spacesToSearch array
            if (value === 0) {
                let currentAdjacent = this.adjacentChooser(index)
                for (let j = 0; j < currentAdjacent.length; j++) {
                    let box = currentAdjacent[j]
                    let move = board
                    if (board[box] === -1) {
                        spacesToSearch.push(currentAdjacent[j])
                    }
                    if (board[box] === -1) {
                        let counter = this.surroundingSquaresCounter(box)
                        move[box] = counter
                    }
                    this.setState ({
                      board: move,
                    })
                }
            }
        }
    }

    adjacentChooser = (id) => {
        const { rowLength } = this.state
        const surroundingSquaresIfFirst = [id, id-rowLength, id-(rowLength-1), id+1, id+rowLength, id+(rowLength+1)]
        const surroundingSquaresIfLast = [id, id-(rowLength+1), id-rowLength, id-1, id+(rowLength-1), id+rowLength]
        const surroundingSquares = [id, id-(rowLength-1), id-rowLength, id-(rowLength+1), id-1, id+1, id+(rowLength-1), id+rowLength, id+(rowLength+1)]
        let adjacentSquares = []
        if (id % rowLength === 0) {
            adjacentSquares = surroundingSquaresIfFirst
        } else if (id % rowLength === rowLength-1) {
            adjacentSquares = surroundingSquaresIfLast
        } else if (id % rowLength !== rowLength-1 || id % rowLength !== rowLength-1) {
            adjacentSquares = surroundingSquares
        }
        return adjacentSquares
    }

    // takes clicked square and fills first part of spacesToSearch array
    clickedSquare = (id) => {
        const { board } = this.state
        let spacesToSearch = []
        let adjacentSquares = this.adjacentChooser(id)
        for (let i = 0; i < adjacentSquares.length; i++) {
            const boardIndex = adjacentSquares[i]
            if (board[boardIndex] === -1) {
                spacesToSearch.push(adjacentSquares[i])
            }
        }
        this.revealBlankSpaces(id, spacesToSearch)
    }

    surroundingSquaresCounter = (id) => {
        const { mines, rowLength } = this.state
        const surroundingSquaresIfFirst = [id-rowLength, id-(rowLength-1), id+1, id+rowLength, id+(rowLength+1)]
        const surroundingSquaresIfLast = [id-(rowLength+1), id-rowLength, id-1, id+(rowLength-1), id+rowLength]
        const surroundingSquares = [id-(rowLength-1), id-rowLength, id-(rowLength+1), id-1, id+1, id+(rowLength-1), id+rowLength, id+(rowLength+1)]
        let counter = 0
        if (id % rowLength === 0) {
            for (let i = 0; i < surroundingSquaresIfFirst.length; i++) {
                for (let j = 0; j < mines.length; j++) {
                    if (surroundingSquaresIfFirst[i] === mines[j]) {
                        counter ++
                    }
                }
            }
        } else if (id % rowLength === rowLength-1) {
            for (let i = 0; i < surroundingSquaresIfLast.length; i++) {
                for (let j = 0; j < mines.length; j++) {
                    if (surroundingSquaresIfLast[i] === mines[j]) {
                        counter ++
                    }
                }
            }
        } else if (id % rowLength !== rowLength-1 || id % rowLength !== rowLength-1) {
            for (let i = 0; i < surroundingSquares.length; i++) {
                for (let j = 0; j < mines.length; j++) {
                    if (surroundingSquares[i] === mines[j]) {
                        counter ++
                    }
                }
            }
        }
        return counter
    }

    gameLost(id) {
        let { mines, board } = this.state
        let tempBoard = board
        this.stopStopwatch()
        mines.map(el => {
            if (el !== id) {
                return tempBoard[el] = 11
            }
        })
        this.setState({
            board: tempBoard,
            stopwatch: false
        })
    }


    render() {
        return (
            <main>
                <section className='startGameContainer'>
                    <div id='easyGame' className='startGame' onClick={() => this.plantMines(10, 64)}>
                        Easy
                    </div>
                    <div id='intermediateGame' className='startGame' onClick={() => this.plantMines(40, 256)}>
                        Intermediate
                    </div>
                    <div id='difficultGame' className='startGame' onClick={() => this.plantMines(99, 420)}>
                        Difficult
                    </div>
                </section>
                    <div className='infoContainer'>
                            <div className='placeholder stopwatchContainer'>
                                888
                            </div>
                    </div>
                <div id="board" style={{width:this.state.boardWidth}}>
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
