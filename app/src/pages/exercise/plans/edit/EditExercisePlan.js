import React, {useCallback, useEffect, useState} from "react";

import background from "../../../../assets/css/Background.module.css";
import padding from "../../../../assets/css/Padding.module.css";

import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Formik} from "formik";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import rowStyle from "../../../../assets/css/Row.module.css";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import buttonStyle from "../../../../assets/css/Button.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "react-bootstrap/Stack";
import {GetExercise, GetSize, UpdateCollection} from "../../../../provider/firestore/FirestoreProvider";
import Image from "react-bootstrap/Image";
import setFilePath from "../../../../misc/filePath";
import toast, {Toaster} from "react-hot-toast";
import {wait} from "@testing-library/user-event/dist/utils";
export default function EditExercisePlanWrapper() {
    const {state} = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();

    const [exercises, setExercises] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState(-1);
    const [user, setUser] = useState(1);

    const success = useCallback(() => {
        toast.success("You have successfully updated exercise plan!");
    },[])

    const fetchExercises = useCallback(() => {
        GetExercise().then(data => setExercises(data)).catch(err => console.log(err));
        },[])

    useEffect(() => {
        fetchExercises()
    },[fetchExercises])
  return (
      <Formik
          onSubmit={async (values) => {
              try {
                  let totalCalories = 0;
                  values.exercises.forEach(item => {
                      totalCalories += item['Calories'];
                  })
                  let path = "";
                  if (values.image !== "") {
                      path = setFilePath(values.image, "/images/ExerciseImages/")
                  }
                  const data = {
                      exercises: values.exercises,
                      image_ref: path,
                      planID: id,
                      title: values.title,
                      totalCalories: totalCalories,
                      userID: user
                  }
                  const status = await UpdateCollection("Plan", id, data);
                  if (status) {
                      success();
                      await wait(500);
                      navigate(-1);
                  }
                  else {
                      const error = () => toast.error("There was an error in updating your exercise plan");
                      error();
                  }
              } catch (err) {
                  const error = () => toast.error("An error have occurred. Please follow the direction " + err.message);
                  error();
              }
          }}
          enableReinitialize
          initialValues={{
              title: state.exercisePlan['title'],
              exercises: state.exercisePlan['exercises'],
              image: "",
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
          <div className={background.default}>
              <h1 className={padding.headerTop}>Edit Exercise Plans</h1>
              <Container className={`${padding.container} bg-black text-white rounded-4`}>
                  <Form onSubmit={handleSubmit}>
                      <Form.Group controlId="titleInput">
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
                      <Stack>
                          <div className={`${rowStyle.select} mx-auto`}>
                              <Form.Select
                                  className="mb-3"
                                  defaultValue={1}
                                  onChange={(e) => {
                                  setSelectedExercise(parseInt(e.target.value));
                              }}>
                                  {exercises.map((item,index) => (
                                      <option key={index} value={item['exID']}>{item.title}</option>
                                      )
                                  )}
                              </Form.Select>
                              {selectedExercise !== null && (
                                  <Form.Group>
                                      <Row className={rowStyle.plans}>
                                          <Col>
                                              <Image height={100} width={150} src={exercises.find(item => item['exID'] === selectedExercise)?.image_ref}
                                                     alt={exercises.find(item => item['exID'] === selectedExercise)?.title}/>
                                          </Col>
                                          <Col className="d-flex justify-content-center align-items-center text-black">
                                              <div>{exercises.find(item => item['exID'] === selectedExercise)?.title}</div>
                                          </Col>
                                          <Col className="d-flex align-items-center">
                                              <Button variant="outline-primary"
                                                      onClick={() => {
                                                  let item = exercises.find(item => item['exID'] === selectedExercise);
                                                  let tmp = values.exercises;
                                                  tmp.push({
                                                      exID: selectedExercise,
                                                      Reps: 10,
                                                      Sets: 3,
                                                      Rest: 60,
                                                      Calories:  item?.met * item?.time * 10 * 3,
                                                  })
                                                  setFieldValue("exercises", tmp);
                                              }}
                                                      disabled={values.exercises.find(item => item['exID'] === selectedExercise)}
                                              >Add</Button>
                                          </Col>
                                      </Row>
                                  </Form.Group>
                              )}
                          </div>
                      <div className={`${rowStyle.edit} text-black mx-auto`}>
                          <h5 className="text-white">Exercises</h5>
                          {
                              values.exercises.map((exercise, index) => (
                                  <Row className={rowStyle.plans} key={index}>
                                      <Col>
                                          <p>Name:</p>
                                          <div>{exercises.find(item => item['exID'] === exercise['exID'])?.title}</div>
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
                                              setFieldValue("exercises", values.exercises?.filter((e,id) => id !== index))
                                          }>
                                              <DeleteIcon color="action"/>
                                          </Button>
                                      </Col>
                                  </Row>
                              ))
                          }
                      </div>
                          <Button type="submit" className="mx-auto">Submit</Button>
                      </Stack>
                  </Form>
              </Container>
              <Toaster/>
          </div>
          )}
      </Formik>
  );
}