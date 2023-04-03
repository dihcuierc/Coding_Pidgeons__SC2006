import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {Formik} from "formik";
import Form from "react-bootstrap/Form";
import formStyle from "../../../../../assets/css/Form.module.css";
import Button from "react-bootstrap/Button";
import React from "react";

import data from "../../../../../data/fitnessGoals.json";

export default function GoalsForm({goals}) {
    const navigate = useNavigate();
    const schema = Yup.object().shape({
        goal: Yup.string()
            .required("There must be a name for your goal"),
        target: Yup.number()
            .positive("Your target must be positive")
            .required("You must have a target value!"),
        current: Yup.number()
            .positive("Your current must be positive!")
            .required("You must have a current value!"),
        date: Yup.date()
            .min(new Date(Date.now() - 86400000), "Your Target cannot be in the past")
            .max(new Date(Date.now() + (3.15 * Math.pow(10,12) )), "Your target cannot be more than 100 years")
            .required("You must have a target date!")
    })
    return (
        <Formik
            validationSchema={schema}
            onSubmit={(values) => {
                const goal = {
                    "id": data.length + 1,
                    "goal-title": values.goal,
                    "due-date": values.date,
                    "target-value": values.target,
                    "current-value": values.current,
                    "done": false,
                }
                data.push(goal);
                navigate("/goals");
            }}
            initialValues={{
                goal : goals['goal-title'],
                target: goals['target-value'],
                current: goals['current-value'],
                date: new Date(goals['due-date'])
        }}>
            {({
                  handleSubmit,
                  handleChange,
                  values,
                  touched,
                  errors
              }) => (
                <Form onSubmit={handleSubmit} className={`${formStyle.goals} mx-auto`}>
                    <Form.Group className="mb-3" controlId="goalInput">
                        <Form.Control
                            required
                            name="goal"
                            type="text"
                            placeholder="Goals to be achieved"
                            value={values.goal}
                            onChange={handleChange}
                            isInvalid={!!errors.goal && touched.goal}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors?.goal}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="targetInput">
                        <Form.Control
                            name="target"
                            type="number"
                            placeholder="Target Value"
                            value={values.target}
                            onChange={handleChange}
                            isInvalid={!!errors.target && touched.target}/>
                        <Form.Control.Feedback type="invalid">
                            {errors?.target}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="currentValueInput">
                        <Form.Control
                            name="current"
                            type="number"
                            placeholder="Current Value"
                            value={values.current}
                            onChange={handleChange}
                            isInvalid={!!errors.current && touched.current}
                        />
                        <Form.Control.Feedback
                            type="invalid">
                            {errors?.current}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="date">
                        <Form.Control
                            type="date"
                            name="date"
                            value={values.date}
                            onChange={handleChange}
                            isInvalid={!!errors.date && touched.date}
                        />
                        <Form.Control.Feedback
                            type="invalid">
                            {errors?.date}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button className="mx-auto w-50 mb-3" variant="danger" type="submit">
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    )
}