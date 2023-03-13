import React from 'react';
import "./Table.css";
import exercisePlanData from "../../data/exercisePlanData.json";

export default function Table() {
  const totalCaloriesBurned = exercisePlanData.reduce((total, exercisePlan) => total + exercisePlan.caloriesBurned, 0);
  return (
    <div className="Table-container">
        <table className='Table'>
        <thead>
            <tr>
            <th>No.</th>
            <th>Exercise</th>
            <th>Reps</th>
            <th>Sets</th>
            <th>Rest (seconds)</th>
            <th>Calories Burned</th>
            </tr>
        </thead>
        <tbody>
            {exercisePlanData.map((exercisePlan, index) => (
            <tr key={index}>
                <td>{exercisePlan.id}</td>
                <td>{exercisePlan.exerciseName}</td>
                <td>{exercisePlan.reps}</td>
                <td>{exercisePlan.sets}</td>
                <td>{exercisePlan.rest}</td>
                <td>{exercisePlan.caloriesBurned}</td>
            </tr>))}
            <tr>
            <td colSpan="5">Total Calories Burned</td>
            <td>{totalCaloriesBurned}</td>
            </tr>
        </tbody>
        </table>
    </div>
  );
}