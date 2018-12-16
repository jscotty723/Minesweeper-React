import React, { Component } from 'react';

class Square extends Component {

    squareContent = (value) => {
        if (value === -1 || value === 0 || value === 9 || value === 10) {
            return false
        } else {
            return value
        }
    }

  backgroundChooser = (value) => {
      const BACKGROUNDS = ["url('../Images/square.png')", "url('../Images/flag.png')", "url('../Images/bomb.png')", ""]
      if (value === -1) {
          return BACKGROUNDS[0]
      } else if (value === 2) {

      }
  }


  render() {
      const COLORS = [null, "blue", "green", "red", "purple", "maroon", "teal", "black", "gray"]
    return (
      <div
        contextMenu="none"
        id="square"
        onContextMenu={
            () => this.props.rightClick(this.props.index)}
        onClick={
            () => {this.props.playerTurn(this.props.index)}}
        style={
            {color:COLORS[this.props.arrayVal]},
            {backgroundImage:this.backgroundChooser(this.props.arrayVal)}
        }
      >
        {this.squareContent(this.props.arrayVal)}
      </div>
    );
  }
}

export default Square;
