import React, {useCallback, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

import * as Yup from "yup";
import {Field, FieldArray, Formik} from "formik";

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

import exerciseData from "../../../../../data/exerciseData.json";
import exerciseGroups from "../../../../../data/exerciseGroupData.json";
import exercisePlans from "../../../../../data/exercisePlanData.json";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ExercisePlanForm() {
    const schema = Yup.object().shape({
        title: Yup
            .string()
            .required("Exercise Plan must have a name!"),
        exercise: Yup.array().of(
                Yup.object().shape({
                name: Yup
                    .string()
                    .required(),
                reps: Yup.number()
                    .positive()
                    .required(),
                sets: Yup.number()
                    .positive()
                    .required(),
                rest: Yup.number()
                    .positive()
                    .required()
            })),
        image: Yup.mixed().nullable(),
    });

    const [selectGroup, setSelectGroup] = useState(1);
    const exerciseRef = useRef([]);
    const success = () => toast.success("Exercise added successfully!");
    const cancel = () => toast.error("Exercise not added.");
    const goBack = useNavigate();

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
            onSubmit={values => {
                console.log(values);
            }}
            initialValues={{
                title: "",
                exercises: [],
                image: ""
            }}>
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
                                }}>
                                        {renderDropdown()}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId="exercisesInput">
                                <Form.Label>Exercises</Form.Label>
                                {
                                    exerciseData
                                        .filter(data => data['exercise-group-id'] === selectGroup)
                                        .map((item, index) =>
                                    (
                                        <Row className={rowStyle.plans} key={index}>
                                            <Col xs={2}>
                                                <Image fluid src={item.path} alt={item.alt}/>
                                            </Col>
                                            <Col className="d-flex justify-content-center align-items-center">
                                                <div>{item.alt}</div>
                                            </Col>
                                            <Col xs={2} className="d-flex align-items-center">
                                                <Button className={`${buttonStyle.transparent} mb-0`} onClick={(e) => {
                                                    let tmp = values.exercises;
                                                    tmp.push({
                                                        name: item.alt,
                                                        reps: 10,
                                                        sets: 3,
                                                        rest: 60
                                                    })
                                                    setFieldValue("exercises", tmp);
                                                }} disabled={values.exercises.find(obj => obj.name === item.alt)}>
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
                        {values.exercises.length !== 0 && (
                            <div className="add-exercise-block">
                                {
                                    values.exercises.map((exercise, index) => (
                                        <Row className={rowStyle.plans} key={index}>
                                            <Col>
                                                <p>Name:</p>
                                                <div>{exercise.name}</div>
                                            </Col>
                                            <Col xs={2}>
                                                <p>Reps:</p>
                                                <Form.Group controlId="repsInput">
                                                    <Form.Control
                                                        name={`exercises[${index}].reps`}
                                                        type="number"
                                                        value={values.exercises[index].reps}
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
                                                        name={`exercises[${index}].sets`}
                                                        type="number"
                                                        value={values.exercises[index].sets}
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
                                                        name={`exercises[${index}].rest`}
                                                        type="number"
                                                        value={values.exercises[index].rest}
                                                        onChange={handleChange}
                                                        isInvalid={!!errors.rest && touched.rest}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors?.rest}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={2} className="d-flex align-items-center">
                                                <Button className={`${buttonStyle.transparent} mb-0`} onClick={() =>
                                                    setFieldValue("exercises", values.exercises.filter(e => e.name !== exercise.name))
                                                }>
                                                    <DeleteIcon color="action"/>
                                                </Button>
                                            </Col>
                                        </Row>
                                    ))
                                }
                            </div>
                        )}
                    </Container>
                </Form>
            )}
        </Formik>
    )
}

function onClick() {

}