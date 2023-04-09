import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';

import cardStyle from "../../../../assets/css/Card.module.css"
import textStyle from "../../../../assets/css/Text.module.css"

import './ViewBMI.css';
import {useAuth} from "../../../../provider/auth/AuthProvider";

export default function BMI() {
    const {user} = useAuth();
    const [height, setHeight] = useState(user?.height);
    const [weight, setWeight] = useState(user?.weight);
    const [bmi, setBMI] = useState(0);
    const marks = [
        {
          value: 15,
          label: '15',
        },
        {
          value: 18.5,
          label: '18.5',
        },
        {
            value: 25,
            label: '25',
        },
        {
          value: 30,
          label: '30',
        },
        {
          value: 40,
          label: '40',
        },
      ];
      function valuetext(value) {
        return `${value}°C`;
      }


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
      
        <Card className={`${cardStyle.dashboard} bg-dark opacity-75`}>
            <Stack direction="horizontal" gap={4}>
                <Card.Title className={textStyle.dashboard_title}> BMI Calculator </Card.Title>
            </Stack>   
            <Card.Body>
                <Stack direction="horizontal" gap={4} className="d-sm-flex flex-sm-wrap flex-md-nowrap">
                    <Stack gap={4}>
                        <div className="height-card">
                            <Stack direction="horizontal" gap={4}>
                                <p className="px-3 pt-2">Height:</p>
                            
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
                        </div>

                        <div className="weight-card">
                            <Stack direction="horizontal" gap={4}>
                                    <p className="px-3 pt-2">Weight:</p>
                                
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
                        </div>
                    </Stack>
                    <Stack direction='vertical' gap={4}>
                        <Card className="wrapper">
                        <Card.Title className='BMITitle'>Body Mass Index (BMI)</Card.Title>
                        <Card.Body className="calculator-card">
                            <Stack gap={1}>
                                <Stack direction="horizontal" gap={4}>
                                    
                                    <Card.Body className="BMIvalue">
                                        <p style={{color:'white', fontSize:'30px'}}>{bmi}</p>
                                    </Card.Body>
                                    <Card.Body className='healthy'>You're {getBMIClass()}</Card.Body>
                                    
                                </Stack> 
                                <Slider
                                    aria-label="BMI"
                                    defaultValue={bmi}
                                    value={bmi}
                                    getAriaValueText={valuetext}
                                    marks={marks}
                                    min={15}
                                    max={40}
                                    sx={{
                                        background: 'linear-gradient(to right, #B5D4F1, #81E5DB, #E8D284, #E2798E)',
                                        '> span': { backgroundColor: 'none', color:'white' },
                                        '& 	.MuiSlider-mark': {
                                            color: 'transparent',
                                        },
                                        '& 	.MuiSlider-rail': {
                                            color: 'transparent',
                                        }
                                    }}
                                    disabled 
                                />
                                
                                </Stack>
                        </Card.Body>
                        </Card>
                    </Stack>
                </Stack>
            </Card.Body>
        </Card>
    )
}