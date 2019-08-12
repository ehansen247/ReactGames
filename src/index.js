import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

import Homepage from './components/homepage';
import Connect4 from './components/connect4';
import TicTacToe from './components/ticTacToe';

import './css/index.css';


class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <Navbar bg="primary" variant="dark">
          <Navbar.Brand>React-Games</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="connect4">Connect4</Nav.Link>
              <Nav.Link href="ticTacToe">TicTacToe</Nav.Link>
            </Nav>
          </Navbar>

          <Route path="/" exact component={ Homepage } />
          <Route path="/connect4" component={ Connect4 } />
          <Route path="/ticTacToe" component={ TicTacToe } />
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));


