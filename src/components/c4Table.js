import React from 'react';
import '../css/c4.css';

// Represents a row in a Connect4 Game
class TableRow extends React.Component {

  clicked = (event) => {
    let key2 = parseInt(event.target.dataset.col);
    this.props.add(parseInt(this.props.row), key2);
  }

  render() {
    const r = this.props.row;

    return (
      <tr key={r}>
        <td className="c4Square" data-col="0" onClick={this.clicked}>
          <span data-col="0" className="dot" style={{backgroundColor: this.props.board[r][0]}}></span>
        </td>
        <td className="c4Square" data-col="1" onClick={this.clicked}>
          <span data-col="1" className="dot" style={{backgroundColor: this.props.board[r][1]}}></span>
        </td>
        <td className="c4Square" data-col="2" onClick={this.clicked}>
          <span data-col="2" className="dot" style={{backgroundColor: this.props.board[r][2]}}></span>
        </td>
        <td className="c4Square" data-col="3" onClick={this.clicked}>
          <span data-col="3" className="dot" style={{backgroundColor: this.props.board[r][3]}}></span>
        </td>
        <td className="c4Square" data-col="4" onClick={this.clicked}>
          <span data-col="4" className="dot" style={{backgroundColor: this.props.board[r][4]}}></span>
        </td>
        <td className="c4Square" data-col="5" onClick={this.clicked}>
          <span data-col="5" className="dot" style={{backgroundColor: this.props.board[r][5]}}></span>
        </td>
        <td className="c4Square" data-col="6" onClick={this.clicked}>
          <span data-col="6" className="dot" style={{backgroundColor: this.props.board[r][6]}}></span>
        </td>
      </tr>
    );
  }
}

export default TableRow;
