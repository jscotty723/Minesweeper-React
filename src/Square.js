import React, { Component } from 'react';

class Square extends Component {

  renderSquare = (value) => {
    if (value != null && value != "X") {
      return value
    } else if (value == null) {
      return null
    } else if (value == "X") {
      return "mine"
    }
  }


  render() {
    return (
      <div
        contextMenu="none"
        id="square"
        onMouseDown={() => this.props.rightClick(this.props.index)}
        onClick={() => {this.props.playerTurn(this.props.index)}}
      >
        {this.renderSquare(this.props.arrayVal)}
      </div>
    );
  }
}

export default Square;
