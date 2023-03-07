import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import "./ViewGoals.css";
import React, { useState } from "react";

export default function ViewGoals() {
    const [refreshCount, setRefreshCount] = useState(0);

    function handleGoalDoneClick() {
      setRefreshCount(refreshCount + 1);
    }
    return (
        <>
            <Card className="bg-dark opacity-75">
                    <Card.Title className="text-white"> Fitness Goals </Card.Title>
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
                                <Stack>
                                    <p className="goal-date">date</p>
                                    <button className="goal-done" onClick={handleGoalDoneClick}>Done</button>
                                </Stack>
                            </Stack>
                        </Card.Body>
                    </Card.Body>
            </Card>
        </>
    )
}