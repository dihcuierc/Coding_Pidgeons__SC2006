import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import React from "react";
import background from "../../assets/css/Background.module.css"
import Container from "react-bootstrap/esm/Container";
import './ViewReviews.css';
import Rating from '@mui/material/Rating';
import exerciseReviews from "../../data/exerciseReviews.json";

export default function ViewReviews() {

    const sortedReviews = exerciseReviews.sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className={background.profile}>
            <Container className='profile-review-container' style={{border:'1px solid black'}}>
                <Card className='profile-review-card' style={{backgroundColor: 'transparent', border:'1px solid black'}}>
                    <Card.Title className='profile-review-title'>
                        All Your Reviews
                    </Card.Title>
                  
                    <Stack direction="vertical" gap={3}>
                        {sortedReviews.map(review => (
                            <Card.Body className='user-review'  key={review.id}>
                                <Stack direction="horizontal" gap={3}>
                                    <div className='exercise-review-picture'>
                                        <p style={{backgroundColor:"yellow"}}>exercise pic</p>
                                    </div>
                                    <div className='individual-review' style={{border:'1px solid black'}}>
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
                                </Stack>
                            </Card.Body>
                        
                        ))}
                       
                    </Stack>
                   
                </Card>   
            </Container>
        </div>
    )
}