import {useCallback, useState, useEffect} from "react";
import * as Yup from "yup";
import {Formik} from "formik";
import {useNavigate, useParams} from "react-router-dom";
import {GetCollection, GetExercise} from "../../../provider/firestore/FirestoreProvider";

import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Stack from "react-bootstrap/Stack";

import background from "../../../assets/css/Background.module.css";

import EditIcon from "@mui/icons-material/Edit";
import "./ExercisePlan.css";
import {useAuth} from "../../../provider/auth/AuthProvider";

export default function ExercisePlan() {
  const { id } = useParams();
  const navigate = useNavigate();
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
            <EditIcon onClick={() =>
                navigate("./edit",{
                    state: {
                        exercisePlan : exercisePlan
                    }
                })} />
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
    </div>
  )
}
