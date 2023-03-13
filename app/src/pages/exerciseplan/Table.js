import React from 'react';
import "./Table.css";

export default function Table() {
  return (
    <div className="Table-container">
        <table className='Table'>
        <thead>
            <tr>
            <th>No.</th>
            <th>Exercise</th>
            <th>Reps</th>
            <th>Rest</th>
            <th>Sets</th>
            <th>Calories Burned</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>1</td>
            <td>Bicep curls</td>
            <td>10</td>
            <td>60 sec</td>
            <td>3</td>
            <td>100</td>
            </tr>
            <tr>
            <td>2</td>
            <td>Tricep extensions</td>
            <td>12</td>
            <td>45 sec</td>
            <td>3</td>
            <td>80</td>
            </tr>
            <tr>
            <td>3</td>
            <td>Push-ups</td>
            <td>15</td>
            <td>30 sec</td>
            <td>3</td>
            <td>120</td>
            </tr>
        </tbody>
        </table>
    </div>
  );
}