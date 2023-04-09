import React, {useCallback, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import AddIcon from "@mui/icons-material/AddCircleOutlined";

import buttonStyle from "../../../../../assets/css/Button.module.css";
import cardStyle from "../../../../../assets/css/Card.module.css";
import rowStyle from "../../../../../assets/css/Row.module.css";
import iconStyle from "../../../../../assets/css/Icon.module.css"
import textStyle from "../../../../../assets/css/Text.module.css";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {collection, onSnapshot} from "firebase/firestore";
import {initializeFirebase} from "../../../../../provider/FirebaseConfig";
import {DeleteDoc, UpdateCollection} from "../../../../../provider/firestore/FirestoreProvider";
import {useAuth} from "../../../../../provider/auth/AuthProvider";

const {db} = initializeFirebase();
export default function GoalCard({add,clickable}) {
    const [goals, setGoals] = useState([])
    const navigate = useNavigate();
    const {user} = useAuth();

    const onDelete = useCallback(() => {
        toast.success("Goal have been successfully deleted!");
    },[])

    const onComplete = useCallback(() => {
        const sunday = new Date();
        sunday.setDate((sunday.getDate() - sunday.getDay()) + 7);
        toast.success("Goal Completed! It will be removed on " + sunday.toLocaleString("en-GB"));
    },[])

    useEffect(() => {
        const goalsRef = collection(db,"Goal");
        const unsub = onSnapshot(goalsRef, (snapshot) => {
            const docs = snapshot.docs.map((doc) => {
                return ({...doc.data(), id: doc.id});
            });
            setGoals(docs);
        })
        return () => unsub();
    },[goals])
    return (
        <Card className={cardStyle.goals}>
            <Container className="p-4">
                <div className="d-flex mb-2">
                    <h3 className="display-6 text-white">
                        {clickable ?
                        <Link to="/goals" className="text-decoration-none text-white">
                            Fitness Goals
                        </Link> : <div>Fitness Goals</div>
                            }
                    </h3>
                    {add &&
                        <div className="ms-auto">
                            <Link to="./add">
                                <AddIcon className={iconStyle.add}/>
                            </Link>
                        </div>
                    }
                </div>
                <Card.Body className="ps-0">
                        {goals.filter(item => item.userID === parseInt(user.userID)).map((item,index) => (
                            <div className="d-flex mb-3" key={index}>
                                <div className={`${rowStyle.goals} d-flex align-items-center`}>
                                        <Col className="p-3">
                                            <Card.Text className={textStyle.target}>Target: {item['Title']}</Card.Text>
                                        </Col>
                                        <Col xs={2}>
                                            <Card.Text className={textStyle.target}>Target: {item['Target Value']}</Card.Text>
                                            <Card.Text className={textStyle.currentValue}>Current: {item['Current Value']}</Card.Text>
                                        </Col>
                                        <Col>
                                            <Card.Text >Aim: {item['Deadline']}</Card.Text>
                                        </Col>
                                        <Col xs={1} className="d-flex justify-content-end">
                                            <Form.Group>
                                                <Form.Check
                                                    type="checkbox">
                                                    <Form.Check.Input type="checkbox"
                                                                      checked={item.done}
                                                                      onChange={ (e) => {
                                                                          UpdateCollection("Goal",item.id,{
                                                                              done: e.target.checked
                                                                          }).catch(err => console.log(err));
                                                                          if (e.target.checked)
                                                                              onComplete();
                                                                      }}
                                                    />
                                                    <Form.Check.Label className="mb-1">Done</Form.Check.Label>
                                                </Form.Check>
                                            </Form.Group>
                                        </Col>
                                </div>
                                <Row xs={1}>
                                    <Button className={buttonStyle.transparent} onClick={() => {
                                        navigate(`/goals/${item.id}`, {
                                            state: {
                                                goals: item,
                                            }})
                                    }}>
                                            <EditIcon/>
                                    </Button>
                                    <Button className={buttonStyle.transparent} onClick={() => {
                                        DeleteDoc("Goal", item.id).catch(err => console.log(err));
                                        onDelete();
                                    }}>
                                        <DeleteIcon/>
                                    </Button>
                                </Row>
                            </div>
                            )
                        )}
                </Card.Body>
            </Container>
            <Toaster/>
        </Card>
    )
}