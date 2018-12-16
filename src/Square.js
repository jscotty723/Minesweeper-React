import React, { Component } from 'react';

class Square extends Component {

  renderSquare = (value) => {
    if (value != null && value !== "X") {
      return value
    } else if (value === null) {
      return null
  } else if (value === "M") {
      return value
  } else if (value === "F")
    return value
  }




  render() {
      const COLORS = ["orange", "blue", "green", "red", "purple", "maroon", "teal", "black", "gray"]
    return (
      <div
        contextMenu="none"
        id="square"
        onContextMenu={() => this.props.rightClick(this.props.index)}
        onClick={() => {this.props.playerTurn(this.props.index)}}
        style={{color:COLORS[this.props.arrayVal]}}
      >
        {this.renderSquare(this.props.arrayVal)}
      </div>
    );
  }
}

export default Square;
