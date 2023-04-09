import {useLocation} from "react-router-dom";

import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card";

import GoalsForm from "../../components/utilities/forms/goals/GoalsForm";

import backgroundStyle from "../../../assets/css/Background.module.css";


export default function EditGoalsWrapper() {
    const {state} = useLocation();
    return (
        <div className={`${backgroundStyle.default} d-grid`}>
            <Container className="d-flex justify-content-center my-auto">
                <Card className="bg-dark opacity-75">
                    <Card.Title className="display-6 text-white mx-auto">
                        Edit Goals
                    </Card.Title>
                    <Card.Body>
                        <GoalsForm goals={state.goals}/>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}
