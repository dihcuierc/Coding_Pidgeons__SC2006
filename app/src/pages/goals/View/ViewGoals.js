import React from "react";

import Container from "react-bootstrap/Container";

import background from "../../../assets/css/Background.module.css"

import GoalCard from "../../components/utilities/cards/goals/GoalCard";
export default function ViewGoalsWrapper() {
    return (
        <div className={`${background.default} d-grid`}>
            <Container className="d-flex my-auto justify-content-center">
                <GoalCard add={true}/>
            </Container>
        </div>
    )
}