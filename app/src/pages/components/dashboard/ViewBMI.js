import Card from "react-bootstrap/Card";
import './ViewBMI.css';
import Stack from "react-bootstrap/Stack";
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';

export default function BMI() {

    const [height, setHeight] = useState('0');
    const [weight, setWeight] = useState('0');
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
                        <Card style={{width:"300px", height:"220px", backgroundColor:'#4A4949'}}>
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