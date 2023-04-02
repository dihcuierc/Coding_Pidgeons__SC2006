import React from "react";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";

import GoalsForm from "../../components/utilities/forms/goals/GoalsForm";

import backgroundStyle from "../../../assets/css/Background.module.css";


export default function AddGoalWrapper() {

    return (
        <div className={`${backgroundStyle.profile} d-grid`}>
            <Container className="d-flex justify-content-center my-auto">
                <Card className="bg-dark opacity-75">
                    <Card.Title className="display-6 text-white mx-auto">
                        Fitness Goals
                    </Card.Title>
                    <Card.Body>
                        <GoalsForm goals={{}}/>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}

