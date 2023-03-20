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
import fitnessGoals from "../../data/fitnessGoals.json";
import toast, { Toaster } from "react-hot-toast";

export default function FitnessGoals() {
    const [goals, setGoals] = useState(fitnessGoals.map(goal => ({ ...goal, checked: goal.done })));

    const [checked, setChecked] = useState();
    const sortedGoals = goals.sort((a, b) => new Date(b['due-date']) - new Date(a['due-date']));

    const success = () => toast.success("Goal deleted successfully");
    

    const handleGoalDoneClick = (event, id) => {
        const updatedGoals = goals.map((goal) =>
        goal.id === id ? { ...goal, checked: event.target.checked } : goal
        );
        setGoals(updatedGoals);
        const sunday = new Date();
        sunday.setDate(sunday.getDate() + (7 - sunday.getDay()) % 7 + 1); // get next Sunday
        const formattedSunday = sunday.toLocaleDateString('en-GB'); // format to DD/MM/YYYY
        
        if (event.target.checked) {
            const done = () => toast.success("Goal Completed! It will be removed on " + formattedSunday);
            done();
        }
    }

    const handleDeleteGoalClick = (id) =>  {
        const updatedGoals = goals.filter((goal) => goal.id !== id);
        setGoals(updatedGoals);
        success();
    }
    return (
        <div className={background.profile}>
            <Container className='fitnessgoalscontainer'>
                
                    <Card className="bg-dark opacity-75 fitnessgoalcard">
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
                        {sortedGoals.map((goal) => (
                            <Card.Body>
                                <Stack direction="horizontal">
                                    <Stack>
                                        <Card.Body className="fitness-goal" >
                                            <Stack direction="horizontal" gap={3}>
                                                <Stack>
                                                    <p className="goal-to-achieve">Target: {goal['goal-title']} </p>
                                                   
                                                </Stack>
                                                <Stack>
                                                    <p className="goal-to-achieve">Target: {goal['target-value']} </p>
                                                    <p className="current-standing">Current: {goal['current-value']} </p>
                                                </Stack>
                                                <p className="goal-date" style={{marginLeft:"auto"}}>
                                                    <Stack direction="horizontal">
                                                        Aim: {goal['due-date']} 
                                                        <Stack style={{paddingLeft:"20px"}}>
                                                        <FormGroup>
                                                            <FormControlLabel control={
                                                            <Checkbox 
                                                            checked={goal.checked}
                                                            onChange={(event) => handleGoalDoneClick(event, goal.id)}
                                                                fontsize='large' sx={{
                                                                    color: common['white'],
                                                                    '&.Mui-checked': {
                                                                    color: common['white'],
                                                                    },
                                                                }}/> 
                                                            } label="Done" />
                                                            <Toaster />      
                                                        </FormGroup>
                                                        </Stack>
                                                    </Stack>
                                                </p>
                                            </Stack>
                                        </Card.Body>
                                    </Stack>
                                    <button className="delete-fitness-goal" onClick={() => handleDeleteGoalClick(goal.id)}>
                                        <DeleteIcon/>
                                    </button>
                                    <Toaster />            
                                </Stack>
                            </Card.Body>

                        ))}
                    </Card>
               
            </Container>
        </div>
    )
}