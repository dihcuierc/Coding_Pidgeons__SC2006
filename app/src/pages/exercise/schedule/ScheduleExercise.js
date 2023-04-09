import React, {useCallback, useEffect, useState} from "react";
import background from "../../../assets/css/Background.module.css";
import padding from "../../../assets/css/Padding.module.css";
import "react-calendar/dist/Calendar.css";

import Calendar from "react-calendar";
import "./ScheduleExercise.css";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import Stack from "react-bootstrap/Stack";
import {useLocation, useNavigate} from "react-router-dom";
import {Formik} from "formik";
import Form from "react-bootstrap/Form";
import {AddCollection, GetPlan, GetSize, UpdateCollection} from "../../../provider/firestore/FirestoreProvider";
import Button from "react-bootstrap/Button";
import {calculateDate, convertStringToDate, convertTimeToTimeStamp} from "../../../misc/dateConverter";
import toast, {Toaster} from "react-hot-toast";
import {wait} from "@testing-library/user-event/dist/utils";
import {useAuth} from "../../../provider/auth/AuthProvider";

export default function ScheduleExercise() {
  const {state} = useLocation();
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(date.getTime());
  const [endTime, setEndTime] = useState(date.getTime() + 3600000);
  const [plans, setPlans] = useState([]);
  const [exercisePlan, setExercisePlan] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  const getPlans = useCallback(() => {
    GetPlan().then(data => setPlans(data)).catch(err => console.log(err));
  },[])
  
  
  const success = useCallback(() => {
    toast.success("You have successfully scheduled an exercise");
  },[])

  const error = useCallback(() => {
    toast.error("There was an error when scheduling your exercise!");
  },[])

  useEffect(() => {
    if (state !== null) {
      const exercise = state.exercise;
      setExercisePlan(exercise.planID);
    }
    getPlans();
  },[state, date, startTime, endTime, exercisePlan, getPlans])

  return (
      <Formik
          onSubmit={ async  (values) => {
            try {
              let status = false;
                const start = calculateDate(startTime);
                const end = calculateDate(endTime);
                const scheduleDate = new Date(date).toLocaleDateString("en-GB");
                const size = await GetSize("ScheduleExercise");
                const data = {
                  date: scheduleDate,
                  "end time": end,
                  planID: values.plan,
                  "start time": start,
                  userID: user.userID,
                }
                state === null ?
                  status = await AddCollection("ScheduleExercise", size, data) :
                  status = await UpdateCollection("ScheduleExercise",state.exercise.id,data);

              if (status) {
                await wait(500);
                success();
                navigate(-1);
              }
              else {
                error();
              }
            } catch (err) {
              console.log(err);
              error();
            }
          }}
          initialValues={{
            plan: 1
          }}>
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
            resetForm
          }) => (
        <div className={background.default}>
          <Form onSubmit={handleSubmit} onReset={resetForm}>
          <h1 className={padding.headerTop} style={{color: "white"}}>Schedule Exercise</h1>
          <Stack className="stack-container" gap={3}>
            <Calendar
                onChange={setDate}
                value={date}
                calendarType="US" />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="row-item">
                <Typography sx={{ left: "20px" }}>Start Time</Typography>
                <DesktopTimePicker
                    value={dayjs(startTime)}
                    ampm={false}
                    onChange={(newValue) => setStartTime(newValue)}
                    sx={{
                      marginLeft: "20px",
                      "& .MuiInputBase-input": { color: "white" },
                    }}
                />
              </div>
              <div className="row-item">
                <Typography>End Time</Typography>
                <DesktopTimePicker
                    value={dayjs(endTime)}
                    ampm={false}
                    onChange={(newValue) => setEndTime(newValue)}
                    sx={{
                      marginLeft: "20px",
                      "& .MuiInputBase-input": { color: "white" },
                    }}
                />
              </div>
            </LocalizationProvider>
            <div className="row-item">
              <Typography>Exercise Plan</Typography>
              <Box sx={{ width: "223px" }}>
                  <Form.Select
                      className="text-white bg-black"
                      name="plan"
                      placeholder="Select an Exercise Plan"
                      value={values.plan}
                      onChange={handleChange}
                      isInvalid={!!errors.plan && touched.plan}
                  >
                    {plans.map((item,index) =>
                        (
                            <option key={index} value={item.planID}>{item.title}</option>
                        ))}
                  </Form.Select>
              </Box>
            </div>
            <div className="d-flex">
            <Button className="mb-3" type="submit">Submit</Button>
            <Button className="mb-3 ms-4" variant="danger" type="reset">Reset</Button>
            </div>
          </Stack>
          </Form>
          <Toaster/>
        </div>
      )}
      </Formik>

  );
}
