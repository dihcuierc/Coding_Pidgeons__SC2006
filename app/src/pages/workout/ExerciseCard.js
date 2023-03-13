import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';

export default function ExerciseCard(props) {
    return (
      <Link to={props.link}>
        <Card className="card">
          <CardHeader
            title={props.title}
            sx={{
            color: "white",
            width: "100%",
            }}
          />
          {props.imageUrl ? (
            <CardMedia
            component="img"
            image={props.imageUrl}
            alt={props.title}
            style={{width: "100%", height: "100%", outline: "none" }}
          />): null}
          
        </Card>
      </Link>
    );
  }