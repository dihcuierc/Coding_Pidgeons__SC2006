import React from "react";
import {useNavigate} from "react-router-dom";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import EditIcon from "@mui/icons-material/Edit";
import MapIcon from "@mui/icons-material/LocationOn";
import DateIcon from "@mui/icons-material/CalendarToday"
import TimeIcon from "@mui/icons-material/AccessTime";

import background from "../../../assets/css/Background.module.css";
import buttonStyle from "../../../assets/css/Button.module.css";
import cardStyle from "../../../assets/css/Card.module.css";
import rowStyle from "../../../assets/css/Row.module.css";

//Temp Data
const data = [
    {
        id: 1,
        name: "Bodyweight Workout",
        location: "Jurong West Park",
        date: "08/03/2023",
        time: "1200 - 1300",
    },
    {
        id: 2,
        name: "HIIT",
        location: "MacRitche Reservoir Park",
        date: "04/03/2023",
        time: "0900 - 1030",
    }
]


export default function ViewExercises() {
    const navigate = useNavigate();

    return (
        <div className={`${background.default} p-5`}>
            <Card className={`${cardStyle.schedule} mx-lg-auto`}>
                <Card.Title className="display-6 mx-auto p-0">Scheduled Exercises</Card.Title>
                <Card.Body>
                    {data.map((item) => (
                        <Row className={rowStyle.exercises}>
                            <div className="mb-2 d-flex">
                                <Card.Text>Exercise Plan 1: {item.name} </Card.Text>
                                <Button className={`${buttonStyle.transparent} ms-auto`}
                                        onClick={() => {
                                            navigate(`/workout/schedule/${item.id}`, {
                                                state: {
                                                    exercise: item
                                                }
                                            })
                                }}>
                                    <EditIcon color="action"/>
                                </Button>
                            </div>
                            <Col className="p-3">
                                <div className="d-flex">
                                    <MapIcon color="error"/>
                                    <Card.Text>{item.location}</Card.Text>
                                </div>
                            </Col>
                            <Col>
                                <div className="d-flex mb-3">
                                    <DateIcon className="me-1"/>
                                    <Card.Text>{item.date}</Card.Text>
                                </div>
                                <div className="d-flex">
                                    <TimeIcon className="me-1"/>
                                    <Card.Text>{item.time}</Card.Text>
                                </div>
                            </Col>
                        </Row>
                    ))}
                </Card.Body>
            </Card>
        </div>
    )
}