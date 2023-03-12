import React from "react";
import background from "../../../assets/css/Background.module.css";
import padding from "../../../assets/css/Padding.module.css";
import '../Exercise.css';




export default function AddExercise() {
    return (
        <div className={background.default}>
            <h1 className={padding.headerTop}>Add Exercise</h1>

            <div className="exercise-container">
                <div className="exercise-block">
                </div>
                <div className="exercise-block">
                </div>
            </div>
        </div>
    )
}