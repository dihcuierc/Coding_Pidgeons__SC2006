import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import React, { useState } from "react";
import background from "../../assets/css/Background.module.css"
import Container from "react-bootstrap/esm/Container";
import "./fitnessgoals.css";
import { Link } from "react-router-dom";

export default function FitnessGoals() {
    const [goals, setGoals] = useState([]);

    //create function to fetch goals from database

    const [refreshCount, setRefreshCount] = useState(0);

    function handleGoalDoneClick() {
      setRefreshCount(refreshCount + 1);
    }
    // do a map for the goals instead of hard code

    return (
        <div className={background.profile}>
            <Container className='fitnessgoalscontainer'>
                <Container className="h-100 d-grid align-content-center">
                    <Card className="bg-dark opacity-75">
                        <Stack direction="horizontal" gap={4}>
                            <Stack>
                                <Card.Title className="fitnessgoalstitle"> Fitness Goals </Card.Title>
                            </Stack>
                            <Link to="/fitnessgoals/edit">
                                <button className="addfitnessgoals">+</button>
                            </Link>
                        </Stack>
                        <Card.Body>
                            <Stack direction="horizontal">
                                <Stack>
                                    <Card.Body className="fitness-goal">
                                        <Stack direction="horizontal">
                                            <Stack>
                                                <p className="goal-to-achieve">Weight Goal</p>
                                                <p className="current-standing">Current Weight</p>
                                            </Stack>
                                            <Stack>
                                                <p className="goal-to-achieve">50kg</p>
                                                <p className="current-standing">60kg</p>
                                            </Stack>
                                            <p className="goal-date">
                                                10/2/2023 <button className="goal-done" onClick={handleGoalDoneClick}>Done</button>
                                            </p>
                                        </Stack>
                                    </Card.Body>
                                </Stack>
                                <button className="delete-fitness-goal" onClick={handleGoalDoneClick}>Delete</button>            
                            </Stack>
                        </Card.Body>
                    </Card>
                </Container>
            </Container>
        </div>
    )
}