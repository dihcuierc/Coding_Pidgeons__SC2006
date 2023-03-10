import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import React, { useState } from "react";
import background from "../../assets/css/Background.module.css"
import Container from "react-bootstrap/esm/Container";
import "./fitnessgoals.css";
import { Link } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { common } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function FitnessGoals() {
    const [goals, setGoals] = useState([]);

    // create function to fetch goals from database

    const [checked, setChecked] = React.useState(true);

    const handleGoalDoneClick = (event) => {
        setChecked(event.target.checked);
        if(event.target.checked) {
            const today = new Date();
            const sunday = new Date(today.setDate(today.getDate() - today.getDay() + 7));
            const sundayFormatted = sunday.toLocaleDateString("en-US");
            
            //edit here for database
            const updatedGoals = goals.filter((goal) => goal.date !== sundayFormatted);
            setGoals(updatedGoals);
          }
      };

    function handleDeleteGoalClick() {
      // handle click to delete goal
    }
    return (
        <div className={background.profile}>
            <Container className='fitnessgoalscontainer'>
                <Container className="h-100 d-grid align-content-center">
                    <Card className="bg-dark opacity-75">
                        <Stack direction="horizontal" gap={4}>
                            <Stack>
                                <Card.Body className="fitnessgoalstitle"> Fitness Goals </Card.Body>
                            </Stack>
                            <Card.Body className="addfitnessgoalscard">
                                <Link to="/fitnessgoals/edit">
                                    <ControlPointIcon fontSize="large" sx={{ color: common['white'] }}/>
                                </Link>
                            </Card.Body>
                        </Stack>
                            <Card.Body>
                                <Stack direction="horizontal">
                                    <Stack>
                                        <Card.Body className="fitness-goal" >
                                            <Stack direction="horizontal">
                                                <Stack>
                                                    <p className="goal-to-achieve">Weight Goal</p>
                                                    <p className="current-standing">Current Weight</p>
                                                </Stack>
                                                <Stack>
                                                    <p className="goal-to-achieve">50kg </p>
                                                    <p className="current-standing">60kg </p>
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
                                    </Stack>
                                    <button className="delete-fitness-goal" onClick={handleDeleteGoalClick}>
                                        <DeleteIcon/>
                                    </button>            
                                </Stack>
                        </Card.Body>
                    </Card>
                </Container>
            </Container>
        </div>
    )
}