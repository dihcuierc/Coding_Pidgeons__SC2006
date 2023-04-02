import React, {useCallback, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import buttonStyle from "../../../../../assets/css/Button.module.css";
import iconStyle from "../../../../../assets/css/Icon.module.css";
import cardStyle from "../../../../../assets/css/Card.module.css";
import divStyle from "../../../../../assets/css/Div.module.css";
import textStyle from "../../../../../assets/css/Text.module.css";

import data from "../../../../../data/fitnessGoals.json";
import toast, {Toaster} from "react-hot-toast";
export default function GoalCard({add,clickable}) {
    const [goals, setGoals] = useState(
        data.sort((a,b) => new Date(b['due-date']) - new Date(a['due-date']))
    )
    const navigate = useNavigate();

    const onDelete = useCallback(() => {
        toast.success("Goal have been successfully deleted!");
    },[])

    const onComplete = useCallback(() => {
        const sunday = new Date();
        sunday.setDate((sunday.getDate() - sunday.getDay()) + 7);
        toast.success("Goal Completed! It will be removed on " + sunday.toLocaleString("en-GB"));
    },[])

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
                                <i className={`bi bi-plus-circle ${iconStyle.add} p-3`}></i>
                            </Link>
                        </div>
                    }
                </div>
                <Card.Body className="ps-0">
                        {goals.map((item,index) => (
                            <div className="d-flex mb-3" key={index}>
                                <div className={`${divStyle.goals} d-flex align-items-center`}>
                                        <Col className="p-3">
                                            <Card.Text className={textStyle.target}>Target: {item['goal-title']}</Card.Text>
                                        </Col>
                                        <Col>
                                            <Card.Text className={textStyle.target}>Target: {item['target-value']}</Card.Text>
                                            <Card.Text className={textStyle.currentValue}>Current: {item['current-value']}</Card.Text>
                                        </Col>
                                        <Col>
                                            <Card.Text >Aim: {item['due-date']}</Card.Text>
                                        </Col>
                                        <Col className="d-flex justify-content-end">
                                            <Form.Group>
                                                <Form.Check
                                                    type="checkbox">
                                                    <Form.Check.Input type="checkbox"
                                                                      checked={item.done}
                                                                      onChange={(e) => {
                                                                          setGoals(goals.map((goal) =>
                                                                              goal.id === item.id ? {...goal , done: e.target.checked} :
                                                                              goal
                                                                          ))
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
                                    <Button className={buttonStyle.goals} onClick={() => {
                                        navigate(`/goals/${item.id}`, {
                                            state: {
                                                goals: item,
                                            }})
                                    }}>
                                            <i className="bi bi-pencil"></i>
                                    </Button>
                                    <Button className={buttonStyle.goals} onClick={() => {
                                        setGoals(goals.filter(goal => goal.id !== item.id));
                                        onDelete();
                                    }}>
                                        <i className="bi bi-trash"></i>
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