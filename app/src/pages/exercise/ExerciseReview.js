import background from "../../assets/css/Background.module.css"
import React, {useEffect, useState} from 'react';
import './ExerciseReview.css';
import { useParams, useNavigate } from 'react-router-dom'
import exercises from "../../data/exerciseData.json";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import Rating from '@mui/material/Rating';
import exerciseReviews from "../../data/exerciseReviews.json";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';


export default function ExerciseReview() {
    const { id } = useParams();
    const exercise = exercises.find((exercise) => exercise.id === parseInt(id));
    console.log(exercise);
    console.log(id);
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [ratingCounts, setRatingCounts] = useState([0, 0, 0, 0, 0]);
    const sum = ratingCounts.reduce((accumulator, currentValue) => accumulator + currentValue);
    const addReview = () => {
        navigate('add');
    };

    useEffect(() => {
        const filteredReviews = exerciseReviews.filter((review) => review["id"] === exercise["id"]);
        setReviews(filteredReviews);

        const totalRating = filteredReviews.reduce((acc, filteredReviews) => {
            return acc + filteredReviews.rating;
          }, 0);
        
          const averageRating = totalRating / filteredReviews.length;
          setAverageRating(averageRating);
        
        const counts = [0, 0, 0, 0, 0];
        filteredReviews.forEach((review) => {
            counts[5 - review.rating] += 1;
        });
        setRatingCounts(counts);
          
      }, [exercise]);


      const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 15,
        width:300,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
          backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
          borderRadius: 5,
          backgroundColor: theme.palette.mode === 'light' ? '#56AF55' : '#56AF55',
        },
      }));
    return(
        <div className={background.default}>
            <Container className='all-exercise-review-container'>
                <Card className='all-exercise-review-card' style={{backgroundColor:"transparent", border:'none'}}>
                    <Stack direction="horizontal" gap={4} >
                        <Card.Title className="all-exercise-title">
                            <h1>All Reviews For:</h1>
                        </Card.Title>
                        
                        <button className='all-add-review-button' onClick={addReview}>Add Review</button>
                    
                    </Stack>
                    <Stack direction="horizontal" gap={5}>
                        <div className='all-exercise-review-details'>
                            <img className="exercise-video-review" src={exercise.path} alt={exercise.alt} style={{display: 'block', margin: 'auto'}}/>
                            <p style={{ textAlign: 'center' }}>Overall Rating For This Exercise:</p>
                            <Stack direction="horizontal" gap={2} style={{ display: 'flex', justifyContent: 'center' }}>
                                <Rating name="half-rating-read" value={averageRating} precision={0.1} size="large" iconEmpty='white' readOnly />
                                <h3 style={{paddingTop:'10px'}}>{averageRating.toFixed(1)}</h3>
                            </Stack>
                            <br></br>
                            <div className='percentage'>
                                <Stack direction="vertical" gap={4}>
                                    {ratingCounts.map((rating_score, index) => (
                                        <Stack direction="horizontal" gap={3} style={{height:"5px"}}>
                                        <p style={{height:"7px", width: "30px"}}>{Math.round(rating_score/sum * 100)}%</p>
                                        <BorderLinearProgress variant="determinate" value={rating_score/sum * 100} />
                                        <p style={{height:"7px"}}>{5-index}</p>
                                        </Stack>
                                    ))}
                                </Stack>
                            </div>
                        </div>
                        <div className='all-exercise-reviews'>
                            <Stack direction="vertical" gap={3}>
                                
                                {reviews.map((review) => (
                                    review.text &&
                                    <div key={review.id} className='all-individual-review' >
                                        <Stack direction="horizontal" gap={3} >
                                            <div className='all-exercise-review-profile'>
                                                <Stack direction="horizontal" gap={3}>
                                                    <p className='all-exercise-profile-image'>image</p>
                                                    <div>
                                                        <p className="all-exeercise-review-name">{review.name}</p>
                                                        <p className='all-exercise-review-date'>{review.date}</p>
                                                    </div>
                                                </Stack>
                                                <Rating name="half-rating-read" value={review.rating} precision={0.5} size="large" readOnly />
                                            </div>
                                            <div className='all-exercise-review-text' >
                                                <p>{review.text}</p>
                                            </div>
                                            <p></p>
                                        </Stack> 
                                    </div>

                               )) }
                            </Stack>
                        </div>
                    </Stack>
                </Card>
            </Container>

        </div>
    )
}
import background from "../../assets/css/Background.module.css"
import React from 'react';
import './ExerciseReview.css';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import exercises from "../../data/exerciseData.json";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import Rating from '@mui/material/Rating';
import ExerciseCard from "../workout/ExerciseCard";


export default function ExerciseReview() {
    const { id } = useParams();

    const exercise = exercises.find((exercise) => exercise.id === parseInt(id));
    
    return(
        <div className={background.default}>
            <Container className='all-exercise-review-container' style={{border:'1px solid blue'}}>
                <Card className='all-exercise-review-card' style={{backgroundColor:"transparent", border:'none'}}>
                    <Stack direction="horizontal" gap={4}>
                        <Card.Title className="all-exercise-title">
                            <h1>All Reviews For:</h1>
                        </Card.Title>
                        <Link to={`/workout/exerciseview/exercise/${id}/exercisereview/add`}>
                            <button className='add-review-button'>Review</button>
                        </Link>
                    </Stack>
                    <Stack direction="horizontal" gap={5}>
                        <div className='all-exercise-review-details'>
                        <img className="exercise-video-review" src={exercise.path} alt={exercise.alt} />
                            <p>Overall Rating For This Exercise:</p>
                            <Stack direction="horizontal" gap={2}>
                                <Rating name="half-rating-read" value={2.5} precision={0.5} size="large" iconEmpty='white' readOnly />
                                <h3 style={{paddingTop:'10px'}}>2.5</h3>
                            </Stack>
                            <p>Percentages</p>
                        </div>
                        <div className='all-exercise-reviews'>
                            <Stack direction="vertical" gap={3}>
                                <div className='all-individual-review'>
                                    <Stack direction="horizontal" gap={3}>
                                        <div className='all-exercise-review-profile'>
                                            <Stack direction="horizontal" gap={3}>
                                                <p className='all-exercise-profile-image'>image</p>
                                                <div>
                                                    <p className="all-exeercise-review-name">Joseph Ma</p>
                                                    <p className='all-exercise-review-date'>04/10/22</p>
                                                </div>
                                            </Stack>
                                            <Rating name="half-rating-read" value={2.5} precision={0.5} size="large" readOnly />
                                        </div>
                                        <p className='all-exercise-review-text'>I recently tried the new restaurant in town and was blown away by the quality of the food. The menu offered a variety of dishes, from classic comfort food to more adventurous options, and everything we tried was delicious. The ingredients were clearly fresh and high-quality, and the presentation was beautiful. The standout dish for me was the lamb chops, which were perfectly cooked and seasoned. The service was also excellent, with friendly and attentive staff who made sure we had a great dining experience. Overall, I highly recommend this restaurant for anyone looking for a delicious and memorable meal.I recently tried the new restaurant in town and was blown away by the quality of the food. The menu offered a variety of dishes, from classic comfort food to more adventurous options, and everything we tried was delicious. The ingredients were clearly fresh and high-quality, and the presentation was beautiful. The standout dish for me was the lamb chops, which were perfectly cooked and seasoned. The service was also excellent, with friendly and attentive staff who made sure we had a great dining experience. Overall, I highly recommend this restaurant for anyone looking for a delicious and memorable meal.I recently tried the new restaurant in town and was blown away by the quality of the food. The menu offered a variety of dishes, from classic comfort food to more adventurous options, and everything we tried was delicious. The ingredients were clearly fresh and high-quality, and the presentation was beautiful. The standout dish for me was the lamb chops, which were perfectly cooked and seasoned. The service was also excellent, with friendly and attentive staff who made sure we had a great dining experience. Overall, I highly recommend this restaurant for anyone looking for a delicious and memorable meal.</p>
                                        <p></p>
                                    </Stack> 
                                </div>

                                <div className='all-individual-review'>
                                    <Stack direction="horizontal" gap={3}>
                                        <div className='all-exercise-review-profile'>
                                            <Stack direction="horizontal" gap={3}>
                                                <p className='all-exercise-profile-image'>image</p>
                                                <div>
                                                    <p className="all-exeercise-review-name">Sug Ma</p>
                                                    <p className='all-exercise-review-date'>04/10/22</p>
                                                </div>
                                            </Stack>
                                            <Rating name="half-rating-read" value={2.5} precision={0.5} size="large" readOnly />
                                        </div>
                                        <p className='all-exercise-review-text'>I recently tried the new restaurant in town and was blown away by the quality of the food. The menu offered a variety of dishes, from classic comfort food to more adventurous options, and everything we tried was delicious. The ingredients were clearly fresh and high-quality, and the presentation was beautiful. The standout dish for me was the lamb chops, which were perfectly cooked and seasoned. The service was also excellent, with friendly and attentive staff who made sure we had a great dining experience. Overall, I highly recommend this restaurant for anyone looking for a delicious and memorable meal.I recently tried the new restaurant in town and was blown away by the quality of the food. The menu offered a variety of dishes, from classic comfort food to more adventurous options, and everything we tried was delicious. The ingredients were clearly fresh and high-quality, and the presentation was beautiful. The standout dish for me was the lamb chops, which were perfectly cooked and seasoned. The service was also excellent, with friendly and attentive staff who made sure we had a great dining experience. Overall, I highly recommend this restaurant for anyone looking for a delicious and memorable meal.I recently tried the new restaurant in town and was blown away by the quality of the food. The menu offered a variety of dishes, from classic comfort food to more adventurous options, and everything we tried was delicious. The ingredients were clearly fresh and high-quality, and the presentation was beautiful. The standout dish for me was the lamb chops, which were perfectly cooked and seasoned. The service was also excellent, with friendly and attentive staff who made sure we had a great dining experience. Overall, I highly recommend this restaurant for anyone looking for a delicious and memorable meal.</p>
                                        <p></p>
                                    </Stack> 
                                </div>

                                
                            </Stack>
                        </div>
                    </Stack>
                </Card>
            </Container>

        </div>
    )
}
