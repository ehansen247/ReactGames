import React, { Component } from 'react';
import connect4Img from '../images/connect4.png';
import ticTacToeImg from '../images/ticTacToe.png';
import { Card, Button } from 'react-bootstrap';

// The website's homepage
class Homepage extends Component {
  render() {
    return (

      <div style= {{textAlign: "center"}} >

        {/* TicTacToe Card */}
        <div style= {{display: "inline-block", marginRight: "80px", marginTop: "100px"}}>
          <Card hoverable="true" style={{ width: '240px', height: '290px' }}>
            <Card.Img variant="top" style={{width: '240px', height: '250px' }} src={ticTacToeImg} />
            <Card.Body>
              <Button variant="primary" href="/ticTacToe">Go To TicTacToe</Button>
            </Card.Body>
          </Card>
        </div>

        {/* Connect4 Card */}
        <div style= {{display: "inline-block", marginTop: "100px"}}>
          <Card hoverable="true" style={{ width: '240px', height: '290px' }}>
            <Card.Img variant="top" style={{ width: '240px', height: '250px' }} src={connect4Img} />
            <Card.Body>
              <Button variant="primary" href="/connect4">Go To Connect4</Button>
            </Card.Body>
          </Card>
        </div>

      </div>

    )
  }
}

export default Homepage;
