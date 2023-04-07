import {useCallback, useState, useEffect} from "react";
import * as Yup from "yup";
import {Formik} from "formik";
import { useParams } from "react-router-dom";
import {GetCollection} from "../../../provider/firestore/FirestoreProvider";

import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Stack from "react-bootstrap/Stack";

import background from "../../../assets/css/Background.module.css";

import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import "./ExercisePlan.css";

export default function ExercisePlan() {
  const { id } = useParams();
  const [exercisePlan, setExercisePlan] = useState({});
  const [exercises, setExercises] = useState([]);
  const [isEditing, setIsEditing] = useState(false)
  const schema = Yup.object().shape({
    exercise: Yup.array().of(
        Yup.object().shape({
          reps: Yup.number()
              .positive("The reps must be a positive number")
              .integer()
              .required(),
          sets: Yup.number()
              .positive()
              .integer()
              .required(),
          rest: Yup.number()
              .positive()
              .integer()
              .required(),
          calories: Yup.number()
              .positive()
              .required()
        })),
  })

  const getPlan = useCallback(() => {
    GetCollection("Plan", id).then((plan) => {
      setExercisePlan(plan);
    }).catch((err) => console.log(err));
  },[id])

  useEffect(() => {
      getPlan();
      setExercises(exercisePlan['exercises']);
    },[exercisePlan, getPlan])

  return (
      <Formik
          validationSchema={schema}
          enableReinitialize
          onSubmit={(values) => console.log(values)}
          initialValues={exercises}
      >
        {({
              handleSubmit,
              handleChange,
              values,
              touched,
              errors,
              resetForm,
            }) => (
    <div className={background.default}>
      <Form className="exercise-plan-container" onSubmit={handleSubmit}>
        <div className="exercise-plan-title">
          <Stack direction="horizontal" gap={3}>
            <h1>Exercise Plans</h1>
            <EditIcon onClick={() => setIsEditing(!isEditing)} />
          </Stack>
          <h2>{exercisePlan.title}</h2>
        </div>
        <div className="table">
          <div className="Table-container">
            <Table responsive className="Table">
              <thead>
              <tr>
                <th>No.</th>
                <th>Exercise</th>
                <th>Reps</th>
                <th>Sets</th>
                <th>Rest (seconds)</th>
                <th>Calories Burned</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              {exercises?.map((exercise, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{exercise["exID"]}</td>
                    <td>
                      {isEditing ? (
                      <Form.Group controlId="repsInput">
                        <Form.Control
                            type="number"
                            value={values[index]['Reps']}
                            name={`${index}['Reps']`}
                            onChange={handleChange}
                            isInvalid={!!errors.reps && touched.reps}
                        />
                          <Form.Control.Feedback type="invalid">
                              {errors?.reps}
                          </Form.Control.Feedback>
                          </Form.Group>
                      ) : (
                          exercise['Reps']
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <Form.Control
                            type="number"
                            value={values[index]['Sets']}
                            name={`${index}['Sets']`}
                            onChange={handleChange}
                        />
                      ) : (
                          exercise['Sets']
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                          <Form.Control
                              type="number"
                              value={values[index]['Rest']}
                              name={`${index}['Rest']`}
                              onChange={handleChange}
                          />
                      ) : (
                          exercise['Rest']
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                          <Form.Control
                              type="number"
                              value={values[index]['Calories']}
                              name={`${index}['Calories']`}
                              onChange={handleChange}
                          />
                      ): ( exercise['Calories'])}
                    </td>
                    {isEditing && (
                        <td className="delete-row">
                          <IconButton
                              aria-label="delete"
                              size="small"
                              onClick={() => {

                              }}
                          >
                            <DeleteIcon color="error" />
                          </IconButton>
                        </td>
                    )}
                  </tr>
              ))}

              <tr>
                <td colSpan="5">Total Calories Burned</td>
                <td>{exercisePlan['totalCalories']}</td>
              </tr>
              </tbody>
            </Table>
          </div>
          {isEditing && (
            <div className="table-save">
              <button type="submit">Save</button>
            </div>
          )}
        </div>
      </Form>
    </div>
        )}
      </Formik>
  );
}
