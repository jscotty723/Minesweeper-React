import React, { Component } from 'react';

class Square extends Component {

  render() {
    return (
      <div id="square" onClick={() => {this.props.playerTurn(this.props.id)}}>
      {this.props.id}
      </div>
    );
  }
}

export default Square;
