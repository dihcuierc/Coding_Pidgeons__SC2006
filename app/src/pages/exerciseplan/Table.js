import React, { useState } from "react";
import "./Table.css";
import exercisePlanData from "../../data/exercisePlanData.json";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export default function Table({ isEditing, setIsEditing }) {
  const [editableData, setEditableData] = useState(exercisePlanData);

  const handleEdit = (index, field, newValue) => {
    const newData = [...editableData];
    newData[index][field] = newValue;
    setEditableData(newData);
  };

  const handleDelete = (index) => {
    const newData = [...editableData];
    newData.splice(index, 1);
    setEditableData(newData);
  };

  const totalCaloriesBurned = exercisePlanData.reduce(
    (total, exercisePlan) => total + exercisePlan.caloriesBurned,
    0
  );

  return (
    <div className="Table-container">
      <table className="Table">
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
              <td>
                {isEditing ? (
                  <input
                    type="number"
                    value={exercisePlan.reps}
                    onChange={(event) =>
                      handleEdit(index, "reps", parseInt(event.target.value))
                    }
                  />
                ) : (
                  exercisePlan.reps
                )}
              </td>
              <td>
                {isEditing ? (
                  <input
                    type="number"
                    value={exercisePlan.sets}
                    onChange={(event) =>
                      handleEdit(index, "sets", parseInt(event.target.value))
                    }
                  />
                ) : (
                  exercisePlan.sets
                )}
              </td>
              <td>
                {isEditing ? (
                  <input
                    type="number"
                    value={exercisePlan.rest}
                    onChange={(event) =>
                      handleEdit(index, "rest", parseInt(event.target.value))
                    }
                  />
                ) : (
                  exercisePlan.rest
                )}
              </td>
              <td>{exercisePlan.caloriesBurned}</td>
              {isEditing && (
                <td className="delete-row">
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => handleDelete(index)}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </td>
              )}
            </tr>
          ))}

          <tr className="last-row">
            <td colSpan="5">Total Calories Burned</td>
            <td>{totalCaloriesBurned}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
