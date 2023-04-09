  
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { Component } from "react";
import ToggleSwitch from "./ToggleSwitch";

function AutoLayoutExample() {
  return (
    <Container style={{color: 'white'}}>
      <Row>
        <Col>Message</Col>
        <Col><ToggleSwitch label = "Message" /></Col>
      </Row>
      <Row>
        <Col>Exercise Reminder</Col>
        <Col><ToggleSwitch label = "ExerciseReminder" /></Col>
      </Row>
      <Row>
        <Col>Friend Request</Col>
        <Col><ToggleSwitch label = "FriendRequest" /></Col>
      </Row>
      <Row>
        <Col>Email Notification</Col>
        <Col><ToggleSwitch label = "EmailNotification" /></Col>
      </Row>
    </Container>
  );
}

export default AutoLayoutExample;