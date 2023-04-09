import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import React, {useState, useEffect, useCallback} from "react";
import background from "../../../assets/css/Background.module.css"
import buttonStyle from "../../../assets/css/Button.module.css"
import Container from "react-bootstrap/esm/Container";
import './ViewReviews.css';
import reviewStyle from "../../../assets/css/Review.module.css";
import Rating from '@mui/material/Rating';
import DeleteIcon from '@mui/icons-material/Delete';
import {DeleteDoc, GetCollection, GetExercise} from "../../../provider/firestore/FirestoreProvider";
import {convertStringToDate} from "../../../misc/dateConverter";
import {initializeFirebase} from "../../../provider/FirebaseConfig";
import {collection, onSnapshot} from "firebase/firestore";
import toast, {Toaster} from "react-hot-toast";
import Button from 'react-bootstrap/Button';
import {useAuth} from "../../../provider/auth/AuthProvider";

const {db} = initializeFirebase();

export default function ViewReviews() {

    const [reviews, setReviews] = useState([]);
    const [exercises, setExercises] = useState([]);
    const { user } = useAuth();


    const fetchExercise = useCallback(() => {
        GetExercise().then(data => setExercises(data));
    },[])

    const onDelete = useCallback(() => {
        toast.success("Review have been successfully deleted!");
    },[])


      useEffect(() => {
          const reviewRef = collection(db,"Review");
          fetchExercise();
          const unsub = onSnapshot(reviewRef, (snapshot) => {
              const docs = snapshot.docs.filter(doc => doc.data().userID === user.userID)
                  .map((doc) => {
                      const exercise = exercises.find(item => item.exID === doc.data().exID);
                  return ({...doc.data(), exercise, id: doc.id});
              });
              setReviews(docs);
          })
      }, [exercises, fetchExercise, reviews, user]);
    
    return (
        <div className={background.default}>
            <Container className='profile-review-container'>
                <Card className='profile-review-card ' style={{border:'none', background : "transparent"}}>
            
                    <Card.Title className='profile-review-title text-white'>
                        All Your Reviews
                    </Card.Title>
                  
                    <Stack direction="vertical" gap={3}>
                        {reviews.sort((a,b) => {
                            const dateA = convertStringToDate(a.date);
                            const dateB = convertStringToDate(b.date);
                            return dateB - dateA;
                        }).map(review => (
                            <Card.Body className='user-review'  key={review.id} >
                                <Stack direction="horizontal" gap={3} style={{width:"100%", padding: '10px'}}>
                                    <div style={{display: 'inline-block'}}>
                                        <img className="exercise-video-small" src={review.exercise?.image_ref} alt={review.exercise?.title} style={{display: 'block', margin: 'auto', width: '150px', height: '150px', objectFit:'cover'}}/>
                                    </div>
                                        <div className={reviewStyle.individual_review}>
                                            <h4>{review.exercise?.title}</h4>
                                            <Rating name="half-rating-read" value={review.rating} precision={0.5} size="large" readOnly sx={{fontSize: '1.25rem'}} />
                                            <Stack direction="horizontal" gap={3}>
                                                <div className='profile-review-profile'>
                                                    <Stack direction="horizontal" gap={3}>
                                                        <p className='profile-review-image'></p>
                                                        <div>
                                                            <p className='profile-review-date'>{review.date}</p>
                                                        </div>
                                                    </Stack>
                                                </div>
                                                <p className='profile-review-text'>{review.comments}</p>
                                            </Stack> 
                                        </div>
                                    <div>
                                        <Button variant="danger" className={buttonStyle.delete} onClick={() => {
                                            DeleteDoc("Review", review.id).catch(err => console.log(err))
                                            onDelete();
                                        }}>
                                            <DeleteIcon/>
                                        </Button>   
                                    </div>
                                        </Stack>
                            </Card.Body>
                        ))}
                    </Stack>
                   <Toaster/>
                </Card>   
            </Container>
        </div>
    )
}