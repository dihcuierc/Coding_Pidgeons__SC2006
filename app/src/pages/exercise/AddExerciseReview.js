import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import React from "react";
import background from "../../assets/css/Background.module.css"
import Container from "react-bootstrap/esm/Container";
import './AddExerciseReview.css';
import Rating from '@mui/material/Rating';
import { useState } from "react";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import exercises from "../../data/exerciseData.json";
import toast, { Toaster } from "react-hot-toast";
import exerciseReviews from "../../data/exerciseReviews.json";

export default function AddExerciseReview(prop) {
    const [value, setValue] = useState(0);
    const [hover, setHover] = useState(-1);
    const [review, setReview] = useState('');
    const navigate = useNavigate();
    const success = () => toast.success("Exercise review added successfully!");
    const error = () => toast.error("Please give a rating before submitting");
    const { id } = useParams();
    const exercise = exercises.find((exercise) => exercise.id === parseInt(id));

    const handleReviewChange = (event) => {
        setReview(event.target.value);
    };
   

    const handleSubmit = () => {
        console.log(value)
        if (value === 0 || value == null) {
            error();
            return;
        }

        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
        const newReview = {
            id: exerciseReviews.length + 1,
            "path": exercise.path,
            "alt": exercise.alt,
            id: exerciseReviews.length + 1,
            "path": exercise.path,
            "alt": exercise.alt,
            "exercise-group-id": exercise["exercise-group-id"],
            "exercise-id": exercise.id,
            "rating": value,
            "text": review,
            "date": formattedDate
        }
     
        exerciseReviews.push(newReview);
        console.log(exerciseReviews);

        navigate(-1);
        
    }
   
    return (
        <div className={background.default}>
            <Container className='exercise-review-container'>
                <Card className='exercise-review-card' style={{backgroundColor:"transparent", border:"none"}}>
                    <Card.Title className='exercise-review-title'>
                        <p style={{color:'white'}}>Add Review For Exercise</p>
                    </Card.Title>
                    <Stack direction="horizontal" gap={3} align-items-start>
                        <Card.Body className='review-exercise-exercise'>
                            <p style={{color:'white'}}>This workout is under your plan:</p>
                            <p className="exercise-review-type">Arms Day</p>
                            <img className="review-exercise-video" src={exercise.path} alt={exercise.alt} />
                        </Card.Body>
                        
                        <Card.Body className='exercise-review-rating-text'>
                            <Card.Title>
                                <p style={{color:'white'}}>Your Rating</p>
                            </Card.Title>
                            <Stack direction="vertical" gap={3}>
                                <Card.Body className='exercise-review-star'>
                                    <Rating className="exercise-rating-star"
                                        name="half-rating" 
                                        defaultValue={0} 
                                        
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                            }}
                                        onChangeActive={(event, newHover) => {
                                            setHover(newHover);
                                            }}
                                        sx={{
                                            '& .MuiRating-iconEmpty': {
                                                color: 'white',
                                            }
                                            }}
                                    
                                        />
                                </Card.Body>
                                <Card.Body className='exercise-review-text'>
                                <Stack direction="vertical" gap={3}>
                                    <textarea
                                        id="review-text"
                                        name="review-text"
                                        className="multiline-text exercise-review-words"
                                        value={review}
                                        onChange={handleReviewChange}
                                        rows='5'
                                        
                                    ></textarea>
                                    <button className="submit-button" onClick={handleSubmit}>Submit</button>
                                    <Toaster />
                                    </Stack>
                                </Card.Body>
                            </Stack>
                        </Card.Body>
                        
                    </Stack>
                </Card>
            </Container>
        </div>
    )
}