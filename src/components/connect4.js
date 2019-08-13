import React, { Component } from 'react';
import C4Row from './c4Table.js';
import '../css/c4.css';

// Represents a game of Connect4
class Connect4 extends Component {

  // Initialize a blank game of Connect4
  constructor(props) {
    super(props);
    var myGrid = [["white", "white", "white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white", "white", "white"]]

    this.state = {
      col: -1,
      red: true,
      over: false,
      board: myGrid,
      won: false
    };
  }

  // Renders the current gameboard of Connect4
  render() {
    const rows = this.state.board.map((row, i) =>
      {
        return (
            <C4Row key={i}
              row={i}
              add={this.add}
              board={this.state.board}
            />
        );
      });
    return (


      <div>
        <br></br>
        <h2>Connect4</h2>

        {/* eslint-disable-next-line */}
        <h1 id="gameOver"></h1>

        <table>
          <tbody>
            {rows}
          </tbody>
        </table>

        <form style={{marginTop: "15px", marginBot: "10px"}}>
          <button type="submit">Reset Board</button>
        </form>
      </div>
    );
  }

  // Adds a new move to the board
  add = (i, j) => {
    let newB = this.state.board;
    if (newB[i][j] !== "white")
      return;
    while(i < 5 && newB[i + 1][j] === "white")
    {
      i++;
    }
    if (this.state.red)
    {
      newB[i][j] = "red";
    }
    else
    {
      newB[i][j] = "black";
    }

    if (this.check(newB))
    {
      document.querySelector("#gameOver").innerHTML= (this.state.red ? "Red" : "Black") + " Wins!";
      if (!this.state.won)
      {
        this.setState({
          board: newB,
          won: true
        });
      }
      return;
    }
    this.setState({
      board: newB,
      red: !this.state.red
    });
  }

  // Checks if the board has been won
  check = (board) => {
    for (let i = 0; i < 6; i++)
    {
      for (let j = 0; j < 7; j++)
      {
        if(this.checkEach(board, i, j))
        {
          return true;
        }
      }
    }
    return false;
  }

  // Checking helper method, checks diagonals, verticals, and horizontals
  checkEach(board, i, j)
  {
    // Checking diagonal, just need to go up and to the right,
    let color = board[i][j];
    if (color === "white")
      return false;

    let diag1 = true;
    for (let k = 1; k < 4; k++)
    {
      if (i + k > 5 || j + k > 6)
      {
        diag1 = false;
        break;
      }
      if (board[i + k][j + k] !== color)
      {
        diag1 = false;
      }
    }

    let diag2 = true;
    for (let k = 1; k < 4; k++)
    {
      if (i - k < 0 || j + k > 6)
      {
        diag2 = false;
        break;
      }
      if (board[i - k][j + k] !== color)
      {
        diag2 = false;
      }
    }

    // Check vertical
    let vert = true;
    for (let k = 1; k < 4; k++)
    {
      if (i + k > 5)
      {
        vert = false;
        break;
      }
      if (board[i + k][j] !== color)
      {
        vert = false;
      }
    }

    let horiz = true;
    for (let k = 1; k < 4; k++)
    {
      if (j + k > 6)
      {
        horiz = false;
        break;
      }
      if (board[i][j + k] !== color)
      {
        horiz = false;
      }
    }

    if (vert || horiz || diag1 || diag2)
    {
      return true;
    }
    return false;
  }

}

export default Connect4;
