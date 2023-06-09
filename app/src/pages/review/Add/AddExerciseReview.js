import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import React, {useCallback, useEffect} from "react";
import background from "../../../assets/css/Background.module.css"
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './AddExerciseReview.css';
import Rating from '@mui/material/Rating';
import { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import {Formik} from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import {AddCollection, GetSize} from "../../../provider/firestore/FirestoreProvider";
import {wait} from "@testing-library/user-event/dist/utils";
import {useAuth} from "../../../provider/auth/AuthProvider";

export default function AddExerciseReview() {
    const { state } = useLocation();
    const exercise = state.exercise;
    const [value, setValue] = useState(0);
    const [hover, setHover] = useState(-1);
    const [review, setReview] = useState('');
    const {user} = useAuth();
    const navigate = useNavigate();

    const schema = Yup.object().shape({
        comments: Yup.string()
            .required("Comment is required"),
    })

    const success = useCallback(() => {
        toast.success("Exercise Review added successfully!");

    },[]);

    const error = useCallback(() =>
        toast.error("Please give a rating before submitting")
    )
    return (
        <Formik
            validationSchema={schema}
            onSubmit={async (values) => {
                try {
                if (!value) {
                    error();
                }
                else {
                    const size = await GetSize("Review");
                    console.log(exercise);
                    const data = {
                        Exercise: exercise.title,
                        comments: values.comments,
                        date: new Date(Date.now()).toLocaleDateString("en-GB"),
                        exID: exercise.exID,
                        rating: value,
                        userID: user.userID,
                    }
                    const status = await AddCollection("Review", size, data);
                    if (status) {
                        success();
                        await wait(500);
                        navigate(-1);
                    }
                }
                } catch(err) {
                    console.log(err);
                }
            }}
            initialValues={{
                comments: "",
            }}>
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors
            }) => (
            <div className={background.default}>
                <Form onSubmit={handleSubmit} className="mx-auto">
                    <Card className="exercise-review-card">
                        <Card.Body>
                            <Container className="h-100 d-grid align-content-center">
                                <Row >
                                    <Row>
                                        <h1 className="text-white" style={{paddingTop: '5rem'}}>Add Review for Exercise</h1>
                                    </Row>
                                    <Col className="d-flex justify-content-center" style={{paddingTop: '5rem'}}>
                                        <div className="exercise-review-left">
                                            <Card.Text className="exercise-review-type">{exercise['title']}</Card.Text>
                                            <Image className="exercise-review-picture" src={exercise['image_ref']} alt={exercise['title']}/>
                                        </div>
                                    </Col>
                                    <Col lg={5}>
                                    <Card.Text className="h4 mt-5 text-white">
                                        Your Rating
                                    </Card.Text>
                                    <div className="exercise-review-star">
                                        <Form.Group>
                                        <Rating
                                            name="half-rating"
                                            onChange={(event, newValue) => {
                                                setValue(newValue);
                                            }}
                                            onChangeActive={(event, newHover) => {
                                                setHover(newHover);
                                            }}
                                            sx={{
                                                '& .MuiRating-iconEmpty': {
                                                    color: 'white',
                                                },
                                                fontSize: "3rem"
                                            }}
                                        />
                                        </Form.Group>
                                    </div>
                                    <Form.Group className="mt-2 exercise-review-text">
                                        <FloatingLabel label="Comments">
                                            <Form.Control
                                                className="comments"
                                                name="comments"
                                                as="textarea"
                                                placeholder="Leave a comment here"
                                                value={values.comments}
                                                onChange={handleChange}
                                                isInvalid={!!errors.comments && touched.comments}
                                            />
                                            <Form.Control.Feedback type="invalid" tooltip>
                                                {errors?.comments}
                                            </Form.Control.Feedback>
                                        </FloatingLabel>
                                        <Button className="submit-button" type="submit">Submit</Button>
                                    </Form.Group>
                                    </Col>
                                </Row>
                            </Container>
                        </Card.Body>
                    </Card>
                </Form>
                <Toaster/>
            </div>
            )}
        </Formik>
    )
}