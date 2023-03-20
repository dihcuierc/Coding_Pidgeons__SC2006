import Card from "react-bootstrap/Card";
import React, { useState } from "react";
import background from "../../assets/css/Background.module.css"
import Container from "react-bootstrap/esm/Container";
import "./fitnessgoals.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import fitnessGoals from "../../data/fitnessGoals.json";
import toast, { Toaster } from "react-hot-toast";



export default function FitnessGoals() {
    const navigate = useNavigate();
    const error1 = () => toast.error("Date cannot be earlier than today.");
    const error2 = () => toast.error("Please fill in all fields before submitting.");
    const handleSubmit = (event) => {
        event.preventDefault(); // prevent the form from submitting and refreshing the page
        // your logic to handle the form submission goes here
        const goal = document.getElementById('goal').value;
        const targetValue = document.getElementById('targetValue').value;
        const currentValue = document.getElementById('currentValue').value;
        const dateInput = document.getElementById('date').value;
        const inputDate = new Date(dateInput); // parse the input date string
        const today = new Date();
        const day = inputDate.getDate().toString().padStart(2, '0'); // get the day with leading zero
        const month = (inputDate.getMonth() + 1).toString().padStart(2, '0'); // get the month with leading zero
        const year = inputDate.getFullYear(); // get the year
        const formattedDate = `${day}/${month}/${year}`; // format the date as "DD/MM/YYYY"
                
        
        if (goal && targetValue && currentValue && formattedDate) {
            if (inputDate <= today) {
                error1();
                return;
            }

            const newgoals = {
                "id": fitnessGoals.length+1,
                "goal-title": goal,
                "due-date": formattedDate,
                "target-value": targetValue,
                "current-value": currentValue,
                "done": null
            }
            fitnessGoals.push(newgoals);
            navigate("/fitnessgoals");
        } else {
            // show an error message or handle the case where fields are blank
            error2();
        }         
    }

    return (
        <div className={background.profile}>
            <Container className='editfitnessgoalscontainer'>
                <Container className="h-100 d-grid align-content-center" >
                    <Card className="bg-dark opacity-75 editfitnessgoalcard" style={{width:'50%'}}>
                        <Card.Title className="fitnessgoalstitle">Fitness Goals</Card.Title>
                        
                        <Form onSubmit={handleSubmit} style={{ margin: '0 40px', marginBottom:'20px'}}>
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
                                <Toaster />
                        </Form>
                    </Card>
                </Container>
            </Container>
        </div>
    )
}