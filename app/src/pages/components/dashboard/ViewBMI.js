import Card from "react-bootstrap/Card";
import './ViewBMI.css';
import Stack from "react-bootstrap/Stack";
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { LinearProgress, makeStyles } from "@mui/material";

export default function BMI() {

    const [height, setHeight] = useState('0');
    const [weight, setWeight] = useState('0');
    const [bmi, setBMI] = useState(0);



    useEffect(() => {
        // Check if both height and weight are greater than zero
        if (height > 0 && weight > 0) {
            // Calculate BMI
            const bmiValue = (weight / Math.pow(height / 100, 2)).toFixed(1);
            setBMI(bmiValue);
        }
    }, [height, weight]);

    const getBMIClass = () => {
        const bmiValue = bmi;
        if (bmiValue < 18.5) {
            return "Underweight";
        } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
            return "Normal";
        } else if (bmiValue >= 25 && bmiValue <= 29.9) {
            return "Overweight";
        } else {
            return "Obese";
        }
    }

    return (
      
        <Card className="bg-dark opacity-75">
            <Stack direction="horizontal" gap={4}>
                
                <Card.Title className="text-white"> BMI Calculator </Card.Title>
                
                
            </Stack>   
            <Card.Body>
                <Stack direction="horizontal" gap={4}>
                    <Stack gap={4}>
                        <Card.Body className="height-card" style={{width:"300px"}}>
                            <Stack direction="horizontal" gap={4}>
                                
                                <Card.Body>Height:</Card.Body>
                            
                                <TextField
                                    id="height"
                                    label="in cm"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                />
                                
                            </Stack>   
                        </Card.Body>  

                        <Card.Body className="weight-card" style={{width:"300px"}}>
                            <Stack direction="horizontal" gap={4}>
                                
                                    <Card.Body>Weight:</Card.Body>
                                
                                    <TextField
                                    id="weight"
                                    label="in kg"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                />
                                
                            </Stack>   
                        </Card.Body>
                    </Stack>
                    <Stack direction='vertical' gap={4}>
                        <Card bg='secondary' style={{width:"300px", height:"200px"}}>
                        <Card.Title>Body Mass Index (BMI)</Card.Title>
                        <Card.Body className="calculator-card">
                            <Stack direction="horizontal" gap={4}>
                                
                                    <Card.Body className="BMIvalue">{bmi}</Card.Body>
                                    <Card.Body className='healthy'>You're {getBMIClass()}</Card.Body>
                                
                            </Stack> 

                            <LinearProgress
                                variant="determinate"
                                height='5'
                                value={bmi}
                                sx={{
                                    background: 'linear-gradient(to right, #6fcbb6, #9c64f4)',
                                    '> span': { backgroundColor: 'red' },
                                }}
                                />
                        </Card.Body>
                        </Card>
                    </Stack>
                </Stack>
            </Card.Body>
        </Card>
    )
}