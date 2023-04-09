import {useCallback, useState} from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import ButtonStyle from "../../../../../assets/css/Button.module.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ExerciseCard(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  },[]);

  const handleClose = useCallback((event) => {
    setAnchorEl(null);
  },[]);

  // need to adjust the exercisePlanData to fit the new data structure


  return (
    <>
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
    </>
  );
}
