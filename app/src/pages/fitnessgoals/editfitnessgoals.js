import Card from "react-bootstrap/Card";
import React, { useState } from "react";
import background from "../../assets/css/Background.module.css"
import Container from "react-bootstrap/esm/Container";
import "./fitnessgoals.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";



export default function FitnessGoals() {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault(); // prevent the form from submitting and refreshing the page
        // your logic to handle the form submission goes here
        const goal = document.getElementById('goal').value;
        const targetValue = document.getElementById('targetValue').value;
        const currentValue = document.getElementById('currentValue').value;
        const date = document.getElementById('date').value;
        
        if (goal && targetValue && currentValue && date) {
            navigate("/fitnessgoals");
        } else {
            // show an error message or handle the case where fields are blank
            alert("Please fill in all fields before submitting.");
        }         
    }

    return (
        <div className={background.profile}>
            <Container className='editfitnessgoalscontainer'>
                <Container className="h-100 d-grid align-content-center">
                    <Card className="bg-dark opacity-75">
                        <Card.Title className="fitnessgoalstitle">Fitness Goals</Card.Title>
                        
                        <Form onSubmit={handleSubmit} style={{ margin: '0 40px' }}>
                            <Form.Group className="mb-3" controlId="goal">
                                <Form.Control size="lg" type="goal" placeholder="Goal to be achieved" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="targetValue">
                                <Form.Control size="lg" type="targetValue" placeholder="Target Value" />
                            </Form.Group>
                            
                            <Form.Group className="mb-3" controlId="currentValue">
                                <Form.Control size="lg" type="currentValue" placeholder="Current Value" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="date">
                                <Form.Control size="lg" type="date" placeholder="By When?" color='#FFF'/>
                            </Form.Group>
                                <Button className='fitnessgoalsubmit' variant="danger" type="submit">
                                    Submit
                                </Button>
                        </Form>
                    </Card>
                </Container>
            </Container>
        </div>
    )
}