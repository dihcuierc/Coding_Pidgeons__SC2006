import background from "../../assets/css/Background.module.css"
import React from 'react';
import './ExercisePlan.css';
import Table from './Table';
import EditIcon from '@mui/icons-material/Edit';
import Stack from 'react-bootstrap/Stack';
import { Link } from 'react-router-dom';


export default function ExercisePlan() {

    return (
        <div className={background.default}>
            <div className="exercise-plan-container">
                <div className="exercise-plan-title">
                    <Stack direction="horizontal" gap={3}>
                        <h1>Exercise Plans</h1>
                        <Link to="/workout/exerciseplan/edit">
                            <EditIcon />
                        </Link>
                    </Stack>
                    <h2>Arms Day</h2>
                </div>
                <div className="Table">
                    <Table />
                </div>
            </div>
        </div>
    )
}
