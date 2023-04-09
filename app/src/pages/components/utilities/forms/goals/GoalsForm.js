import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {Formik} from "formik";
import Form from "react-bootstrap/Form";
import formStyle from "../../../../../assets/css/Form.module.css";
import Button from "react-bootstrap/Button";
import React, {useCallback, useEffect, useState} from "react";
import {AddCollection, GetSize, UpdateCollection} from "../../../../../provider/firestore/FirestoreProvider";
import toast from "react-hot-toast";
import {wait} from "@testing-library/user-event/dist/utils";
import {useAuth} from "../../../../../provider/auth/AuthProvider";

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

    const {user} = useAuth();

    const success = useCallback(() => {
       toast.success("Your goal have been created");
    },[])

    const error = useCallback(() => {
        toast.error("There was an error creating goal");
    },[])

    return (
        <Formik
            validationSchema={schema}
            onSubmit={async (values) => {
                try {
                    let status = false;
                    const size = await GetSize("Goal");
                    const formatDate = new Date(values.date).toLocaleDateString("en-GB");
                    if (Object.keys(goals).length === 0) {
                        const data = {
                            "ID": size + 1,
                            "Title": values.goal,
                            "Deadline": formatDate,
                            "Target Value": values.target,
                            "Current Value": values.current,
                            "done": false,
                            "userID": user.userID,
                        }
                        status = await AddCollection("Goal", size, data);
                    } else {
                        const data = {
                            "ID": goals.id,
                            "Title": values.goal,
                            "Deadline": formatDate,
                            "Target Value": values.target,
                            "Current Value": values.current,
                            "done": false,
                            "userID": goals.userID
                        }
                        status = await UpdateCollection("Goal",goals.id, data);
                    }
                    if (status) {
                        await wait(500);
                        success();
                        navigate("/profile");
                    } else {
                        error();
                    }
                } catch(err) {
                    console.log(err);
                    error();
                }
            }}
            initialValues={{
                goal : goals['Title'],
                target: goals['Target Value'],
                current: goals['Current Value'],
                date: new Date(goals['Deadline'])
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