import background from "../../../assets/css/Background.module.css";
import React from "react";
import "./ExercisePlan.css";
import Table from "./Table";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "react-bootstrap/Stack";
import exercisePlanData from "../../../data/exercisePlanData.json";
import planData from "../../../data/planData.json";
import { useParams } from "react-router-dom";

export default function ExercisePlan() {
  const { id } = useParams();
  const [isEditing, setIsEditing] = React.useState(false);

  const handleSave = (event) => {
    setIsEditing(false);
    console.log(exercisePlanData)
  };

  const filteredExercisePlans = exercisePlanData.filter((exercisePlan) => {
    return exercisePlan["plan-data-id"] === parseInt(id);
  });

  if (filteredExercisePlans.length === 0) {
    return <div>Exercise Plans not found!</div>;
  }

  const exercisePlan = planData.find(
    (plan) => plan.id === filteredExercisePlans[0]["plan-data-id"]
  );

  return (
    <div className={background.default}>
      <div className="exercise-plan-container">
        <div className="exercise-plan-title">
          <Stack direction="horizontal" gap={3}>
            <h1>Exercise Plans</h1>
            <EditIcon onClick={() => setIsEditing(!isEditing)} />
          </Stack>
          <h2>{exercisePlan.title}</h2>
        </div>
        <div className="table">
          <Table isEditing={isEditing} />
          {isEditing && (
            <div className="table-save">
              <button onClick={handleSave}>Save</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
