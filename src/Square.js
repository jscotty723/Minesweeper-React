import React, { Component } from 'react';

class Square extends Component {

    squareContent = (value) => {
        if (value === -1 || value === 0 || value === 9 || value === 10 || value === 11) {
            return false
        } else {
            return value
        }
    }

    backgroundChooser = (value) => {
        const BACKGROUNDS = ["url('../Images/square.png')", "url('../Images/flagNew.png')", "url('../Images/mineNew.png')", "url('../Images/mineHit.png')", ""]
        // miss //
        if (value === -1) {
            return BACKGROUNDS[0]
        // miss but mines in adjacent squares //
        } else if (value === 11) {
            return BACKGROUNDS[2]
        } else if (value === 1 || value === 2 || value === 3 || value === 4 || value === 5 || value === 6 || value === 7 || value === 8) {
            return BACKGROUNDS[4]
        // flag //
        } else if (value === 9) {
            return BACKGROUNDS[1]
        // mine hit//
        } else if (value === 10) {
            return BACKGROUNDS[3]
        // unfound mines //
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
                    {color:COLORS[this.props.arrayVal], backgroundImage:this.backgroundChooser(this.props.arrayVal)}
                }
            >
                {this.squareContent(this.props.arrayVal)}
            </div>
        );
    }
}

export default Square;
