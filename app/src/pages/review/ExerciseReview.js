import background from "../../assets/css/Background.module.css";
import reviewStyle from "../../assets/css/Review.module.css";
import React, {useCallback, useEffect, useState} from 'react';
import './ExerciseReview.css';
import {useParams, useNavigate} from 'react-router-dom'
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import Image from "react-bootstrap/Image"
import Rating from '@mui/material/Rating';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import {GetCollection} from "../../provider/firestore/FirestoreProvider";
import Button from "react-bootstrap/esm/Button";
import {useAuth} from "../../provider/auth/AuthProvider";


export default function ExerciseReview() {
    const { id } = useParams();
    const {user} = useAuth();

    const navigate = useNavigate();
    const [exercise, setExercise] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [ratingCounts, setRatingCounts] = useState([0, 0, 0, 0, 0]);
    const sum = ratingCounts.reduce((accumulator, currentValue) => accumulator + currentValue);

    const addReview = useCallback(() => {
        navigate("add", {
            state: {
                exercise
            }
        })
    },[exercise, navigate])

    //Use Location to get Exercise
    const getExercise = useCallback(() => {
        GetCollection("Exercise", id).then(data => {
            setExercise(data)}).catch(err => console.log(err));
    },[id])

    const getReviews = useCallback(() => {
        GetCollection("Review").then(data => {
            setReviews(data.filter(item => item['exID'] === parseInt(id)))
        })
    },[id])

    useEffect(() => {
        getReviews();
        getExercise();
        const totalRating = reviews.reduce((acc, filteredReviews) => {
            return acc + filteredReviews.rating;
          }, 0);
        
          const averageRating = totalRating / reviews.length;
          setAverageRating(averageRating);
        
        const counts = [0, 0, 0, 0, 0];
        reviews.forEach((review) => {
            counts[5 - review.rating] += 1;
        });
        setRatingCounts(counts);
          
      }, [getExercise, getReviews, reviews]);


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
                <Card className='all-exercise-review-card' style={{backgroundColor:"#202020", border:'none', borderRadius: '40px'}}>
                    <Stack direction="horizontal" gap={4} >
                        <Card.Title className="all-exercise-title">
                            <h1>Reviews</h1>
                            <h2>{exercise.title}</h2>
                        </Card.Title>
                        
                        <Button className='all-add-review-button' variant="danger" onClick={addReview}>Add Review</Button>
                    
                    </Stack>
                    <Stack direction="horizontal" gap={5}>
                        <div className='all-exercise-review-details'>
                            <img className="exercise-video-review" src={exercise['image_ref']} alt={exercise.title}/>
                            <Stack direction="horizontal" gap={2} style={{ display: 'flex', justifyContent: 'center' }}>
                                <h4 style={{ textAlign: 'center', marginTop:"10px" }}>Overall Rating:</h4>
                                <Rating 
                                    name="half-rating-read" 
                                    value={averageRating} 
                                    precision={0.1} 
                                    size="large" 
                                    sx={{
                                        '& .MuiRating-iconEmpty': {
                                          color: 'white',
                                        },
                                        fontSize: "2rem",
                                        paddingTop: "10px",
                                      }}
                                    readOnly 
                                />
                                <h5 style={{paddingTop:'10px'}}>{averageRating.toFixed(1)}</h5>
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
                                    review.comments &&
                                    <div key={review.id} className={reviewStyle.individual_review} >
                                        <Stack direction="horizontal" gap={3} >
                                            <div className='all-exercise-review-profile'>
                                                <Stack direction="horizontal" gap={3}>
                                                    <Image className="ms-3" roundedCircle width={36} height={36} src={user.profileImage} alt={user.name}/>
                                                    <div>
                                                        <p className="all-exeercise-review-name">{review.name}</p>
                                                        <p className='all-exercise-review-date'>{review.date}</p>
                                                    </div>
                                                </Stack>
                                                <Rating name="half-rating-read" value={review.rating} precision={0.5} size="large" readOnly />
                                            </div>
                                            <div className={reviewStyle.review_text} >
                                                <p>{review.comments}</p>
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