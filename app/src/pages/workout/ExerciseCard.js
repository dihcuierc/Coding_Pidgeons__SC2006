import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import ButtonStyle from "../../assets/css/Button.module.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import PlanData from "../../data/planData.json";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function ExerciseCard(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  return (
    <div>
      {props.addExercise ? (
        <div>
          <IconButton
            aria-label="add-exercise"
            className={ButtonStyle.add_exercise}
            onClick={handleClick}
          >
            <AddCircleIcon fontSize="large" color="primary" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {PlanData.map((plan) => (
              <MenuItem key={plan.id} onClick={handleClose}>
                {plan.title}
              </MenuItem>
            ))}
          </Menu>
        </div>
      ) : null}
      <Link to={props.link}>
        <Card className="exercise-card" sx={{ mt: 3 }}>
          <CardHeader
            title={props.title}
            sx={{
              color: "white",
              width: "100%",
            }}
          ></CardHeader>
          {props.imageUrl ? (
            <CardMedia
              component="img"
              image={props.imageUrl}
              alt={props.title}
              style={{ width: "100%", height: "100%", outline: "none" }}
            />
          ) : null}
        </Card>
      </Link>
    </div>
  );
}
