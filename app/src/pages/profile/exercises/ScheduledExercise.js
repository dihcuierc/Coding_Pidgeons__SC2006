import React, {useCallback, useEffect, useState} from "react";
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
import {collection, onSnapshot} from "firebase/firestore";
import {initializeFirebase} from "../../../provider/FirebaseConfig";
import {GetCollection} from "../../../provider/firestore/FirestoreProvider";
import {useAuth} from "../../../provider/auth/AuthProvider";

const {db} = initializeFirebase();
export default function ViewExercises() {
    const navigate = useNavigate();
    const [scheduledExercises, setScheduledExercises] = useState([]);
    const [planTitle, setPlanTitle] = useState([]);
    const {user} = useAuth();

    const getPlans = useCallback(() => {
        GetCollection("Plan").then(plans => {
            setPlanTitle(plans.map(plan => plan.title))
        })
            .catch(err => console.log(err))
    },[])

    useEffect(() => {
        const scheduledRef = collection(db,"ScheduleExercise");
        if (!planTitle.length)
            getPlans();
        const unsub = onSnapshot(scheduledRef, (snapshot) => {
            const docs = snapshot.docs.map((doc) => {
                const planID = doc.data().planID;
                return ({...doc.data(), plan: planTitle[planID-1], id: doc.id});
            });
            setScheduledExercises(docs);
        })
        return () => unsub();
    })

    return (
        <div className={`${background.default} p-5`}>
            <Card className={`${cardStyle.schedule} mx-lg-auto`}>
                <Card.Title className="display-6 mx-auto p-0">Scheduled Exercises</Card.Title>
                <Card.Body>
                    {scheduledExercises.filter(item => item['userID'] === user.userID).map((item) => (
                        <Row className={rowStyle.exercises}>
                            <div className="mb-2 d-flex">
                                <Card.Text>Exercise Plan: {item.id} </Card.Text>
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
                                    <Card.Text>{item.plan}</Card.Text>
                                </div>
                            </Col>
                            <Col>
                                <div className="d-flex mb-3">
                                    <DateIcon className="me-1"/>
                                    <Card.Text>{item.date}</Card.Text>
                                </div>
                                <div className="d-flex">
                                    <TimeIcon className="me-1"/>
                                    <Card.Text>{item['start time']} - {item['end time']}</Card.Text>
                                </div>
                            </Col>
                        </Row>
                    ))}
                </Card.Body>
            </Card>
        </div>
    )
}