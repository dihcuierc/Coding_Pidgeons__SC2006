import background from "../../assets/css/Background.module.css"
import React, {useCallback, useEffect, useState} from 'react';
import './Exercise.css';
import {Link, useParams} from 'react-router-dom'
import Rating from '@mui/material/Rating';
import Button from "react-bootstrap/Button";
import {GetCollection} from "../../provider/firestore/FirestoreProvider";


export default function Exercise() {
    const {id} = useParams();

    const [exercise, setExercise] = useState([]);

    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);


    const fetchExercise = useCallback(() => {
        GetCollection("Exercise",id).then(data => setExercise(data)).catch(err => console.log(err));
    },[id])

    const fetchReview = useCallback(() => {
        GetCollection("Review").then(data =>
            setReviews(data.filter(item => item['exID'] === parseInt(id)))
        )
    },[id])

    useEffect(() => {
        fetchExercise();
        fetchReview();
        const totalRating = reviews.reduce((acc, filteredReviews) => {
            return acc + filteredReviews.rating;
        }, 0);

        const averageRating = totalRating / reviews.length;
        setAverageRating(averageRating);
    }, [exercise, fetchExercise, fetchReview, reviews]);


    return (
        <div className={background.default}>
            <div className="exercise-container">
                <div className="exercise-block">
                    <h1 className="exercise-title">{exercise.title}</h1>
                    <Rating
                        name="half-rating-read"
                        value={averageRating}
                        precision={0.1}
                        size="large"
                        sx={{
                            '& .MuiRating-iconEmpty': {
                                color: 'white',
                            }
                        }}
                        readOnly
                    />
                    <img className="exercise-video" src={exercise['image_ref']} alt={exercise.title}/>
                    <div className="mx-auto text-decoration-none">
                        <Button variant="danger">
                            <Link to="./review" className="text-white text-decoration-none">
                                Review
                            </Link>
                    </Button></div>
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
