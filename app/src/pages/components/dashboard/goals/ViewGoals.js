import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import "./ViewGoals.css";
import React, { useState } from "react";

export default function ViewGoals() {
    const [goals, setGoals] = useState([]);

    //create function to fetch goals from database

    const [refreshCount, setRefreshCount] = useState(0);

    function handleGoalDoneClick() {
      setRefreshCount(refreshCount + 1);
    }
    // do a map for the goals instead of hard code
    return (
            <Card className="bg-dark opacity-75">
                <a href="/fitnessgoals" style={{ textDecoration: "none" }}>
                    <Card.Title className="fitnessgoalstitle"> Fitness Goals </Card.Title>
                </a>
                <Card.Body>
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
                </Card.Body>
            </Card>
    )
}