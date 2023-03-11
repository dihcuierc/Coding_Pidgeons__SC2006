import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import React from "react";
import background from "../../assets/css/Background.module.css"
import Container from "react-bootstrap/esm/Container";
import './ViewReviews.css';

export default function ViewReviews() {
    return (
        <div className={background.profile}>
            <Container className='profile-review-container'>
                <Card className='profile-review-card'>
                    <Card.Title className='profile-review-title'>
                        All Your Reviews
                    </Card.Title>
                  
                    <Stack direction="vertical" gap={3}>
                        <Card.Body className='user-review'>
                            <Stack direction="horizontal" gap={3}>
                                <div className='exercise-review-picture'>
                                    <p style={{backgroundColor:"yellow"}}>exercise pic</p>
                                </div>
                                <div className='individual-review'>
                                    <Stack direction="horizontal" gap={3}>
                                        <div className='profile-review-profile'>
                                            <Stack direction="horizontal" gap={3}>
                                                <p className='profile-review-image'>image</p>
                                                <div>
                                                    <p className="profile-review-name">Joseph Ma</p>
                                                    <p className='profile-review-date'>04/10/22</p>
                                                </div>
                                            </Stack>
                                            <p className='profile-review-rating' >stars</p>
                                        </div>
                                        <p className='profile-review-text'>The movie was a thrilling rollercoaster ride from start to finish. The plot was engaging and the characters were well-developed, with excellent performances by the entire cast. The special effects were top-notch and added to the overall excitement of the film. The soundtrack was also fantastic, perfectly complementing the action on screen. Overall, a must-see for any action movie fan.</p>
                                        <p></p>
                                    </Stack> 
                                </div>
                            </Stack>
                        </Card.Body>
                        
                        
                        <Card.Body className='user-review'>
                            <Stack direction="horizontal" gap={3}>
                                <div className='exercise-review-picture'>
                                    <p style={{backgroundColor:"yellow"}}>exercise pic</p>
                                </div>
                                <div className='individual-review'>
                                    <Stack direction="horizontal" gap={3}>
                                        <div className='profile-review-profile'>
                                            <Stack direction="horizontal" gap={3}>
                                                <p className='profile-review-image'>image</p>
                                                <div>
                                                    <p className="profile-review-name">Joseph Ma</p>
                                                    <p className='profile-review-date'>04/10/22</p>
                                                </div>
                                            </Stack>
                                            <p className='profile-review-rating' >stars</p>
                                        </div>
                                        <p className='profile-review-text'>I recently tried the new restaurant in town and was blown away by the quality of the food. The menu offered a variety of dishes, from classic comfort food to more adventurous options, and everything we tried was delicious. The ingredients were clearly fresh and high-quality, and the presentation was beautiful. The standout dish for me was the lamb chops, which were perfectly cooked and seasoned. The service was also excellent, with friendly and attentive staff who made sure we had a great dining experience. Overall, I highly recommend this restaurant for anyone looking for a delicious and memorable meal.I recently tried the new restaurant in town and was blown away by the quality of the food. The menu offered a variety of dishes, from classic comfort food to more adventurous options, and everything we tried was delicious. The ingredients were clearly fresh and high-quality, and the presentation was beautiful. The standout dish for me was the lamb chops, which were perfectly cooked and seasoned. The service was also excellent, with friendly and attentive staff who made sure we had a great dining experience. Overall, I highly recommend this restaurant for anyone looking for a delicious and memorable meal.I recently tried the new restaurant in town and was blown away by the quality of the food. The menu offered a variety of dishes, from classic comfort food to more adventurous options, and everything we tried was delicious. The ingredients were clearly fresh and high-quality, and the presentation was beautiful. The standout dish for me was the lamb chops, which were perfectly cooked and seasoned. The service was also excellent, with friendly and attentive staff who made sure we had a great dining experience. Overall, I highly recommend this restaurant for anyone looking for a delicious and memorable meal.</p>
                                        <p></p>
                                    </Stack> 
                                </div>
                            </Stack>
                        </Card.Body>
                    </Stack>
                   
                </Card>   
            </Container>
        </div>
    )
}