import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import React, {useState, useEffect } from "react";
import background from "../../../assets/css/Background.module.css"
import Container from "react-bootstrap/esm/Container";
import './ViewReviews.css';
import Rating from '@mui/material/Rating';
import exerciseReviews from "../../../data/exerciseReviews.json";
import DeleteIcon from '@mui/icons-material/Delete';

export default function ViewReviews() {

    const [reviews, setReviews] = useState(exerciseReviews);

    const sortedReviews = reviews.sort((a, b) => {
        const dateA = a.date.split('/').reverse().join('-');
        const dateB = b.date.split('/').reverse().join('-');
        return new Date(dateB) - new Date(dateA);
      });

      useEffect(() => {
        setReviews(reviews);
      }, [reviews]);

      const handleDeleteReview = (id) => {        
        const updatedReviews = reviews.filter(review => review.id !== id);
        setReviews(updatedReviews);
    };

    return (
        <div className={background.default}>
            <Container className='profile-review-container'>
                <Card className='profile-review-card ' style={{border:'none', background : "transparent"}}>
            
                    <Card.Title className='profile-review-title text-white'>
                        All Your Reviews
                    </Card.Title>
                  
                    <Stack direction="vertical" gap={3}>
                        {sortedReviews.map(review => (
                            <Card.Body className='user-review'  key={review.id} >
                               
                                <Stack direction="horizontal" gap={3} style={{width:"100%"}}>
                                    <div className='exercise-review-picture'>
                                        <img className="exercise-video-small" src={review.path} alt={review.alt} style={{display: 'block', margin: 'auto'}}/>
                                    </div>
                                        <div className='individual-review'>
                                            <Stack direction="horizontal" gap={3}>
                                                <div className='profile-review-profile'>
                                                    <Stack direction="horizontal" gap={3}>
                                                        <p className='profile-review-image'>image</p>
                                                        <div>
                                                            <p className="profile-review-name">Joseph Ma</p>
                                                            <p className='profile-review-date'>{review.date}</p>
                                                        </div>
                                                    </Stack>
                                                    <Rating name="half-rating-read" value={review.rating} precision={0.5} size="large" readOnly />
                                                </div>
                                                <p className='profile-review-text'>{review.text}</p>
                                                <p></p>
                                            </Stack> 
                                        </div>
                                        <button className="delete-review" onClick={() => handleDeleteReview(review["id"])}>
                                            <DeleteIcon/>
                                        </button>
                                        </Stack>
                            </Card.Body>
                        
                        ))}
                       
                    </Stack>
                   
                </Card>   
            </Container>
        </div>
    )
}