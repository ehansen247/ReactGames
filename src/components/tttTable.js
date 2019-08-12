import React from 'react';

// Represents a row in a TicTacToe game
class TableRow extends React.Component {

  // Triggers the move function in ticTacToe.js
  click = (event) =>
  {
    this.props.move(this.props.row, parseInt(event.target.dataset.col));
  }

  // Renders a row
  render()
  {
    const r = this.props.row;
    const row = this.props.board[r];
    return (
      <tr>
        <td className="tttSquare" data-col="0" onClick={this.click}>{row[0]}</td>
        <td className="tttSquare" data-col="1" onClick={this.click}>{row[1]}</td>
        <td className="tttSquare" data-col="2" onClick={this.click}>{row[2]}</td>
      </tr>
    );
  }
}

export default TableRow;
