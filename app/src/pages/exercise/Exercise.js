import background from "../../assets/css/Background.module.css"
import React from 'react';
import './Exercise.css';
import { useParams } from 'react-router-dom'
import exercises from "../../data/exerciseData.json";
import exerciseGroups from "../../data/exerciseGroupData.json";
import { Link } from 'react-router-dom';


export default function Exercise() {
    const { id } = useParams();

    const exercise = exercises.find((exercise) => exercise.id === parseInt(id));

    if (!exercise) {
        return <div>Exercise not found!</div>;
    }

    const exerciseGroup = exerciseGroups.find((exerciseGroup) => exerciseGroup.id === exercise["exercise-group-id"]);
    if (!exerciseGroup) {
        return <div>Exercise group not found!</div>;
    }

    return(
        <div className={background.default}>
            <Link to={`/workout/exerciseview/exercise/${id}/exercisereview`}>
                    <button>Review</button>
                </Link>
            <div className="exercise-container">
                <div className="exercise-block">
                    <h1 className="exercise-title">{exercise.alt}</h1>
                    <p>{exerciseGroup.title} Exercise</p>
                    <div className="exercise-rating">{generateStars(exercise.rating)}</div>
                    <img className="exercise-video" src={exercise.path} alt={exercise.alt} />
                </div>
                <div className="exercise-block">
                    <div className="exercise-instructions">
                        <h3 className="instructions-title">Instructions</h3>
                        <p className='instructions-description'>{exercise.instructions}</p>
                    </div>
                    <div className="exercise-remarks">
                        <h3 className="remarks-title">Remarks</h3>
                        <p className="remarks-description">{exercise.remarks}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function generateStars(rating) {
    const stars = [];
  
    for (let i = 0; i < 5; i++) {
      const starClass = i < rating ? "star filled" : "star";
      stars.push(<div key={i} className={starClass}></div>);
    }
  
    return stars;
  }
