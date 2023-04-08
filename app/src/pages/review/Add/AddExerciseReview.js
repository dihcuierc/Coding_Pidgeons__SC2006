import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import React, {useCallback, useEffect} from "react";
import background from "../../../assets/css/Background.module.css"
import Container from "react-bootstrap/esm/Container";
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

export default function AddExerciseReview() {
    const { state } = useLocation();
    const exercise = state.exercise;
    const [value, setValue] = useState(0);
    const [hover, setHover] = useState(-1);
    const [review, setReview] = useState('');
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
                        userID: 1
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
                                <Stack direction="horizontal" gap={3} className="d-flex justify-content-center flex-wrap">
                                    <div>
                                        <Card.Text className="d-flex text-white p-3 display-6">
                                            Add Review for Exercise
                                        </Card.Text>
                                        <Card.Text className="exercise-review-type">{exercise['title']}</Card.Text>
                                        <Image height={300} width={450} src={exercise['image_ref']} alt={exercise['title']}/>
                                    </div>
                                    <div className="ms-3">
                                        <Card.Text className=" h4 mt-5 text-white">
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
                                                    fontSize: "4rem"
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
                                    </div>
                                </Stack>
                            </Card.Body>
                    </Card>
                </Form>
                <Toaster/>
            </div>
            )}
        </Formik>
    )
}