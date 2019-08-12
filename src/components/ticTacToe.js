import React, { Component } from 'react';
import '../css/ttt.css';
import TableRow from './tttTable';

// Represents a game of TicTacToe
class TicTacToe extends Component {

    // TicTacToe constructor
    constructor(props)
    {
      super(props);
      let board = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]];
      this.state = {
        over: false,
        xTurn: true,
        board: board
      };
    }

    // Render a live TicTacToe game
    render() {
      const rows = this.state.board.map((row, i) =>
      {
        return (
          <TableRow
            key = {i}
            row = {i}
            board = {this.state.board}
            move = {this.move}
          />
        );
      });

      return (
        <div>
        <br></br>
        <h2>TicTacToe</h2>

        {/* eslint-disable-next-line */}
        <h1 id="gameOver"></h1>

         <table>
            <tbody>
              {rows}
            </tbody>
          </table>

          <br />
          <button onClick={this.comp}>Computer Move</button>
          <br/> <br />

          <form>
              <button type="submit">Reset Board</button>
          </form>
          <br />

        </div>
      );
    }

    // Register a move
    move = (i, j) =>
    {

      // Check if the game ended on previous turn, otherwise process move
      if (this.state.over) { return; };

      // Input next move
      let newB = this.state.board;
      if (newB[i][j] !== " ")
        return;
      if (this.state.xTurn)
      {
        newB[i][j] = "X";
      }
      else
      {
        newB[i][j] = "O";
      }

      // Check if the game ended on that turn
      if (this.check(newB, newB[i][j]))
      {
        document.querySelector("#gameOver").innerHTML= (this.state.xTurn ? "X" : "O") + " Wins!";
        if (!this.state.over)
        {
          this.setState({
            board: newB,
            over: true
          });
        }
        return;
      }

      // Update game state
      this.setState({
        board: newB,
        xTurn: !this.state.xTurn
      });

    }

    // Check if the board has been won
    check = (board, turn) =>
    {
      let diag1 = true;
      let diag2 = true;
      let horiz = true;
      let vert = true;

      for (let i = 0; i < 3; i++)
      {
        for (let j = 0; j < 3; j++)
        {
          if(board[i][j] !== turn)
          {
            horiz = false;
          }

          if(board[j][i] !== turn)
          {
            vert = false;
          }
        }
        if (horiz === true || vert === true)
          return true;
        else
        {
          horiz = true;
          vert = true;
        }
        if (board[i][i] !== turn)
          diag1 = false;
        if (board[i][2 - i] !== turn)
          diag2 = false;
      }

      return diag1 || diag2;
    }

    // Computer Move
    comp = () =>
    {
      let turn = "";
      let desired = 0;

      // Looking to maximize minimax score if X's turn, otherwise minimize
      if (this.state.xTurn)
      {
        turn = "X";
        desired = 1;
      }
      else
      {
        turn = "O";
        desired = -1;
      }


      let newB = [];

      // Copy over the current board
      for (let i = 0; i < 3; i++)
      {
        let row = [];
        for (let j = 0; j < 3; j++)
        {
          row.push(this.state.board[i][j]);
        }
        newB.push(row);
      }

      // Get all possible moves available on the board
      let moves = this.getMoves(newB);
      if (moves.length === 0)
      {
        return;
      }
      if (this.state.over) {
        return;
      }

      let values = [];

      // Consults the values returned by minimax for each possible move
      for (let i = 0; i < moves.length; i++)
      {
        let move = moves[i];
        newB[move[0]][move[1]] = turn;
        let val = this.minimax(newB, desired, 1);

        values.push(val);
        newB[move[0]][move[1]] = " ";
      }

      // Finds the best move by score returned by minimax
      let best = values[0];
      let ind = 0;
      for (let i = 0; i < values.length; i++)
      {
        if (desired === 1)
        {
          if (values[i] > best)
          {
            best = values[i];
            ind = i;
          }
        }
        else {
          if (values[i] < best)
          {
            best = values[i];
            ind = i;
          }
        }
      }

      // Inputs the most recent move
      newB[moves[ind][0]][moves[ind][1]] = turn;
      this.setState({
        board: newB,
        xTurn: !this.state.xTurn
      });

      // Checks if the game has ended
      if (this.check(newB, "O") || this.check(newB, "X"))
      {
        document.querySelector("#gameOver").innerHTML = turn + " Wins!";
        this.setState({
            over: true
        });
      }
    }

    // DFS Minimax Algorithm to determine best available move
    // The computer computes the score of a move by playing against itself
    // after that move and seeing if it can force a win > tie > loss.
    minimax = (board, desired, depth) => {
      let moves = this.getMoves(board);
      let turn = "X";

      // Looking to maximize the game score for X, minimize for O
      // Desired is reversed, because we are looking at the first
      // RESPONSE by the computer, not the initial move
      if (desired < 0)
        turn = "X";
      else
        turn = "O";

      // Counting depth means the computer will prioritize more immediate wins
      // O has won in this state
      if (this.check(board, "O"))
        return -10 + depth;

      // X has won in this state
      if (this.check(board, "X"))
        return 10 - depth;

      // A tie in this state, no moves remaining, neither has won
      if (moves.length === 0)
          return 0;

      // Recursively calls minimax and finds the score for each move available
      // in this new game state
      let values = [];
      for (let i = 0; i < moves.length; i++)
      {
        let move = moves[i];
        board[move[0]][move[1]] = turn;
        let val = this.minimax(board, -desired, depth + 1);
        values.push(val);
        board[move[0]][move[1]] = " ";
      }

      // Determines the best move for the given turn
      let best = values[0];
      for (let i = 0; i < values.length; i++)
      {
        if (desired < 0) // worst case
        {
          if (values[i] > best)
            best = values[i];
        }
        else
        {
          if (values[i] < best)
            best = values[i];
        }
      }
      return best
    }

    // Gets all possible remaining moves on the board (open squares)
    getMoves = (board) =>
    {
      let moves = [];
      for (let i = 0; i < 3; i++)
      {
        for (let j = 0; j < 3; j++)
        {

          if (board[i][j] === " ")
          {
            let row = [];
            row.push(i);
            row.push(j);
            moves.push(row);
          }
        }
      }
      return moves;
    }
  }

export default TicTacToe;
