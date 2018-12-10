import React, { Component } from 'react';
import Board from './Board'
import './App.css';


class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            gameWon: false
        }
    }
  render() {
    return (
      <div id='pageContainer'>
          <h1>This is Minesweeper</h1>
          <Board />
      </div>
    );
  }
}

export default App;
