import React, {useCallback, useEffect, useState} from "react";

import * as Yup from "yup";
import {Formik} from "formik";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import buttonStyle from "../../../../../assets/css/Button.module.css"
import rowStyle from "../../../../../assets/css/Row.module.css";

import AddIcon from "@mui/icons-material/AddCircleOutlined";

import "./ExercisePlanForm.css";

import exerciseGroups from "../../../../../data/exerciseGroupData.json";
import DeleteIcon from "@mui/icons-material/Delete";
import {AddCollection, GetCollection, GetSize} from "../../../../../provider/firestore/FirestoreProvider";
import toast, {Toaster} from "react-hot-toast";
import {wait} from "@testing-library/user-event/dist/utils";
import {useNavigate} from "react-router-dom";
import setFilePath from "../../../../../misc/filePath";
import {useAuth} from "../../../../../provider/auth/AuthProvider";

export default function ExercisePlanForm() {
    const schema = Yup.object().shape({
        title: Yup
            .string()
            .required("Exercise Plan must have a name!"),
        exercise: Yup.array().of(
                Yup.object().shape({
                exID: Yup
                    .string()
                    .required(),
                Reps: Yup.number()
                    .positive()
                    .required(),
                Sets: Yup.number()
                    .positive()
                    .required(),
                Rest: Yup.number()
                    .positive()
                    .required()
            })),
        image: Yup.mixed().nullable(),
    });

    const [selectGroup, setSelectGroup] = useState(1);
    const [exerciseData, setExerciseData] = useState([]);
    const {user} = useAuth();
    const navigate = useNavigate();

    const success = useCallback(() =>
        toast.success("You have successfully created a new Exercise Plan!"),[])

    const getExercises = useCallback(() => {
        GetCollection("Exercise").then((data) => {
            setExerciseData(data)
        })
    },[])

    useEffect(() => {
        if (!exerciseData.length)
            getExercises();
    },[exerciseData.length])
    const renderDropdown = useCallback(() => (
             exerciseGroups.map(group=> (
                <option
                    key={group.id}
                    value={group.id}
                >
                    {group.title}
                </option>
            ))),
        []);

    return (
        <Formik
            validationSchema={schema}
            enableReinitialize
            onSubmit={async values => {
                try {
                const size = await GetSize("Plan");
                let totalCalories = 0;
                let path = "";
                if (values.image !== "") {
                    path = setFilePath(values.image, "/images/ExerciseImages/")
                }
                values.exercises.forEach((item) => {
                  totalCalories += item['Calories']
                })
                const data = {
                    planID: size+1,
                    title: values.title,
                    exercises: values.exercises,
                    image_ref: path,
                    totalCalories: totalCalories,
                    userID: user.userID
                }
                const status = await AddCollection("Plan",size, data).catch(err => console.log(err));
                if (status) {
                    await wait(500);
                    success()
                    navigate(-1);
                }
                } catch(err) {
                    const error = () => toast.error("There was an error" + err.message);
                    error();
                }
            }}
            initialValues={{
                title: "",
                exercises: [],
                image: ""
            }}
        >
            {({
                  handleSubmit,
                  handleChange,
                  values,
                  touched,
                  errors,
                  resetForm,
                  setFieldValue,

              }) => (
                <Form onSubmit={handleSubmit} onReset={() => resetForm} className="add-exercise-form">
                    <Container className="add-exercise-container flex-wrap">
                        <div className="add-exercise-block">
                            <Form.Group  controlId="titleInput">
                                <Form.Label>Exercise Plans</Form.Label>
                                <Form.Control
                                    name="title"
                                    type="text"
                                    placeholder="Add your Exercise Plans"
                                    value={values.title}
                                    onChange={handleChange}
                                    isInvalid={!!errors.title && touched.title}
                                />
                                <Form.Control.Feedback
                                    type="invalid">
                                    {errors?.title}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="groupInput">
                                <Form.Label>Exercise Group</Form.Label>
                                <Form.Select value={selectGroup} onChange={(e) =>{
                                    setSelectGroup(parseInt(e.target.value))
                                }}
                                isInvalid={!!errors.exercises && touched.exercises}>
                                        {renderDropdown()}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors?.exercises}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="exercisesInput">
                                <Form.Label>Exercises</Form.Label>
                                {
                                    exerciseData
                                        .filter(data => data['exgrp_ID'] === selectGroup)
                                        .map((item, index) =>
                                    (
                                        <Row className={rowStyle.plans} key={index}>
                                            <Col xs={2}>
                                                <Image fluid src={item['image_ref']} alt={item.title}/>
                                            </Col>
                                            <Col className="d-flex justify-content-center align-items-center">
                                                <div>{item.title}</div>
                                            </Col>
                                            <Col xs={2} className="d-flex align-items-center">
                                                <Button className={`${buttonStyle.transparent} mb-0`}                                                       onClick={() => {
                                                    let tmp = values.exercises;
                                                    tmp.push({
                                                        exID: item.exID,
                                                        Reps: 10,
                                                        Sets: 3,
                                                        Rest: 60,
                                                        Calories:  item?.met * item?.time * 10 * 3,
                                                    })
                                                    setFieldValue("exercises", tmp);
                                                }} disabled={values.exercises?.find(obj => obj.name === item.title)}>
                                                    <AddIcon color="primary"/>
                                                </Button>
                                            </Col>
                                        </Row>
                                    )
                                )}
                            </Form.Group>
                            <Form.Group  controlId="imageInput">
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    name="image"
                                    type="file"
                                    value={values.image}
                                    onChange={handleChange}
                                    accept="image/jpeg, image/png, image/gif"
                                />
                            </Form.Group>
                            <div className="add-exercise-buttons">
                                <Button type="submit">Save</Button>
                                <Button className="cancel-button" type="reset">Cancel</Button>
                            </div>
                        </div>
                        {values.exercises?.length !== 0 && (
                            <div className="add-exercise-block">
                                {
                                    values.exercises.map((exercise, index) => (
                                        <Row className={rowStyle.plans} key={index}>
                                            <Col>
                                                <p>Name:</p>
                                                <div>{exerciseData.find(item => item['exID'] === parseInt(exercise['exID']))?.title}</div>
                                            </Col>
                                            <Col xs={2}>
                                                <p>Reps:</p>
                                                <Form.Group controlId="repsInput">
                                                    <Form.Control
                                                        name={`exercises[${index}]['Reps']`}
                                                        type="number"
                                                        value={values.exercises[index]['Reps']}
                                                        onChange={handleChange}
                                                        isInvalid={!!errors.reps && touched.reps}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors?.reps}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={2}>
                                                <p>Sets:</p>
                                                <Form.Group controlId="setsInput">
                                                    <Form.Control
                                                        name={`exercises[${index}]['Sets']`}
                                                        type="number"
                                                        value={values.exercises[index]['Sets']}
                                                        onChange={handleChange}
                                                        isInvalid={!!errors.sets && touched.sets}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors?.sets}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={2}>
                                                <p>Rest:</p>
                                                <Form.Group controlId="restInput">
                                                    <Form.Control
                                                        name={`exercises[${index}]['Rest']`}
                                                        type="number"
                                                        value={values.exercises[index]['Rest']}
                                                        onChange={handleChange}
                                                        isInvalid={!!errors.rest && touched.rest}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors?.rest}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <p>Calories:</p>
                                                <Form.Group controlId="caloriesInput">
                                                    <Form.Control
                                                        name={`exercises[${index}]['Calories']`}
                                                        type="number"
                                                        value={values.exercises[index]['Calories']}
                                                        onChange={handleChange}
                                                        isInvalid={!!errors.calories && touched.calories}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors?.calories}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={1} className="d-flex justify-content-center">
                                                <Button className={`${buttonStyle.transparent} mt-4`} onClick={() =>
                                                    setFieldValue("exercises", values.exercises?.filter(e => e.name !== exercise.name))
                                                }>
                                                    <DeleteIcon color="action"/>
                                                </Button>
                                            </Col>
                                        </Row>
                                    ))
                                }
                            </div>
                        )}
                        <Toaster/>
                    </Container>
                </Form>
            )}
        </Formik>
    )
}