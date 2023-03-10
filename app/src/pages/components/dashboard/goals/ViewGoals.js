import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import "./ViewGoals.css";
import React, { useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { common } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

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
                            <Stack direction="horizontal">
                                10/2/2023
                                <Stack>
                                <FormGroup>
                                    <FormControlLabel control={
                                    <Checkbox onChange={handleGoalDoneClick}
                                        fontsize='large' sx={{
                                            color: common['white'],
                                            '&.Mui-checked': {
                                            color: common['white'],
                                            },
                                        }}/> 
                                    } label="Done" />
                                </FormGroup>
                                </Stack>
                                </Stack>
                            </p>
                        </Stack>
                    </Card.Body>
                </Card.Body>
            </Card>
    )
}