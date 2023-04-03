import React from "react";

import background from "../../../../assets/css/Background.module.css";
import padding from "../../../../assets/css/Padding.module.css";

import ExercisePlanForm from "../../../components/utilities/forms/exercisePlans/ExercisePlanForm"
export default function AddExercisePlanWrapper() {
  return (
    <div className={background.default}>
      <h1 className={padding.headerTop}>Add Exercise Plans</h1>
      <ExercisePlanForm/>
    </div>
  );
}