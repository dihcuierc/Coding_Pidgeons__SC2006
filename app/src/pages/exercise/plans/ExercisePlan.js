import {useCallback, useState, useEffect} from "react";
import * as Yup from "yup";
import {Formik} from "formik";
import {useNavigate, useParams} from "react-router-dom";
import {DeleteDoc, GetCollection, GetExercise} from "../../../provider/firestore/FirestoreProvider";

import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Stack from "react-bootstrap/Stack";

import background from "../../../assets/css/Background.module.css";

import EditIcon from "@mui/icons-material/Edit";
import "./ExercisePlan.css";
import {useAuth} from "../../../provider/auth/AuthProvider";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {DeleteUser} from "../../../provider/auth/auth";
import toast, {Toaster} from "react-hot-toast";
import {wait} from "@testing-library/user-event/dist/utils";

export default function ExercisePlan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [exercisePlan, setExercisePlan] = useState({});
  const [exercises, setExercises] = useState([]);
  const [exerciseTitle, setExerciseTitle] = useState([]);
  const {user} = useAuth();

  const getExercises = useCallback(() => {
      GetExercise().then(data => setExerciseTitle(data.map(item => ({title: item.title, id: item.id}))));
  },[])

  const getPlan = useCallback(() => {
    GetCollection("Plan", id).then((plan) => {
      setExercisePlan(plan);
    }).catch((err) => console.log(err));
  },[id])

  const handleShow = useCallback(() => setShow(true),[]);
  const handleClose = useCallback(() => setShow(false),[]);

  useEffect(() => {
      getPlan();
      getExercises();
      setExercises(exercisePlan['exercises']);
    },[exercisePlan, getExercises, getPlan])

  return (
    <div className={background.default}>
      <div className="exercise-plan-container">
        <div className="exercise-plan-title">
          <Stack direction="horizontal" gap={3}>
            <h1>Exercise Plans</h1>
            { exercisePlan.userID === user.userID ? (
                <>
                <EditIcon onClick={() =>
                    navigate("./edit",{
                        state: {
                            exercisePlan : exercisePlan
                        }
                    })} />
                <DeleteIcon onClick={handleShow}/>
                </>
                ) : null
            }
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
                    <td>{exerciseTitle.find(item => parseInt(item.id) === exercise['exID'])?.title}</td>
                    <td>
                        {exercise['Reps']}
                    </td>
                    <td>
                      {exercise['Sets']}
                    </td>
                    <td>
                      {exercise['Rest']}
                    </td>
                    <td>
                      { exercise['Calories']}
                    </td>
                  </tr>
              ))}

              <tr>
                <td colSpan="5">Total Calories Burned</td>
                <td>{exercisePlan['totalCalories']}</td>
              </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      <DeleteModal id={id} show={show} handleClose={handleClose} handleShow={handleShow}/>
      <Toaster/>
    </div>
  )
}

function DeleteModal(props) {
  const navigate = useNavigate();
  const success = useCallback(() => {
    toast.success("You have successfully deleted the exercise plan!");
  })
  const error = useCallback(() => {
    toast.error("There was an error deleting the exercise plan!");
  })
  return (
      <>
        <Modal show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Exercise Plan</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete your exercise plan?</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={async() => {
              const status = await DeleteDoc("Plan",props.id);
              if (status) {
                success();
                await wait(500);
              navigate("../../");
              } else {
                error();
              }
            }}>Delete</Button>
            <Button variant="info" onClick={props.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
  )
}