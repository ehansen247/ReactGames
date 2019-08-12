import React, { Component } from 'react';
import connect4Img from '../images/connect4.png';
import ticTacToeImg from '../images/ticTacToe.png';
import { Card, Button } from 'react-bootstrap';

// The website's homepage
class Homepage extends Component {
  render() {
    return (

      <div style= {{textAlign: "center", marginTop: "100px"}} >

        {/* TicTacToe Card */}
        <Card style={{ display: "inline-block", marginRight: "8em", width: '240px', height: '300px' }}>
          <Card.Img variant="top" style={{ width: '240px', height: '220px' }} src={ticTacToeImg} />
          <Card.Body>
            <Button variant="primary" href="/ticTacToe">Go To TicTacToe</Button>
          </Card.Body>
        </Card>

        {/* Connect4 Card */}
        <Card style={{ display: "inline-block", width: '240px', height: '300px' }}>
          <Card.Img variant="top" style={{ width: '240px', height: '220px' }} src={connect4Img} />
          <Card.Body>
            <Button variant="primary" href="/connect4">Go To Connect4</Button>
          </Card.Body>
        </Card>

      </div>

    )
  }
}

export default Homepage;
