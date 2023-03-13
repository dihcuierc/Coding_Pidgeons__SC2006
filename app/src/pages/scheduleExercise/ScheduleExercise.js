import React from "react";
import background from "../../assets/css/Background.module.css";
import padding from "../../assets/css/Padding.module.css";
import "react-calendar/dist/Calendar.css";

import Calendar from "react-calendar";
import "./ScheduleExercise.css";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import dayjs from "dayjs";
import Stack from "react-bootstrap/esm/Stack";
import planData from "../workout/planData.json";

export default function ScheduleExercise() {
  const [date, setDate] = React.useState(new Date());
  const [startTime, setStartTime] = React.useState(date.getTime());
  const [endTime, setEndTime] = React.useState(date.getTime() + 3600000);
  const [location, setLocation] = React.useState("");
  const [exercisePlan, setExercisePlan] = React.useState("");

  return (
    <div className={background.default}>
      {console.log(startTime)}
      <h1 className={padding.headerTop}>Schedule Exercise</h1>
      <Stack className="stack-container" gap={3}>
        <Calendar onChange={setDate} value={date} calendarType="US" />
        {console.log(date)}
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
            {console.log(startTime)}
          </div>
          <div className="row-item">
            <Typography>End Time</Typography>
            <DesktopTimePicker
              value={dayjs(endTime)}
              ampm={false}
              sx={{
                marginLeft: "20px",
                "& .MuiInputBase-input": { color: "white" },
              }}
            />
          </div>
        </LocalizationProvider>
        <div className="row-item">
          <Typography>Location</Typography>
          <TextField
            required
            label="Required"
            placeholder="Enter Location"
            onChange={(e) => setLocation(e.target.value)}
            sx={{
              "& .MuiInputBase-input": { color: "white" },
            }}
          />
        </div>
        <div className="row-item" style={{ marginBottom: "5rem" }}>
          <Typography>Exercise Plan</Typography>
          <Box sx={{ width: "223px" }}>
            <FormControl
              fullWidth
              sx={{
                "& .MuiInputBase-input": { color: "white" },
              }}
            >
              <InputLabel>Exercise Plan</InputLabel>
              <Select
                onChange={(e) => setExercisePlan(e.target.value)}
              >
                {planData.map((plan) => (
                  <MenuItem value={plan.title}>{plan.title}</MenuItem>
                ))}
              </Select>
              {console.log(exercisePlan)}
            </FormControl>
          </Box>
        </div>
      </Stack>
    </div>
  );
}
