import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import React, {useState, useEffect, useCallback} from "react";
import background from "../../../assets/css/Background.module.css"
import Container from "react-bootstrap/esm/Container";
import './ViewReviews.css';
import Rating from '@mui/material/Rating';
import DeleteIcon from '@mui/icons-material/Delete';
import {DeleteDoc, GetCollection, GetExercise} from "../../../provider/firestore/FirestoreProvider";
import {convertStringToDate} from "../../../misc/dateConverter";
import {initializeFirebase} from "../../../provider/FirebaseConfig";
import {collection, onSnapshot} from "firebase/firestore";
import toast, {Toaster} from "react-hot-toast";
import EditIcon from "@mui/icons-material/Edit";

const {db} = initializeFirebase();

export default function ViewReviews() {

    const [reviews, setReviews] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [user, setUser] = useState(1);


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
              const docs = snapshot.docs.filter(doc => doc.data().userID === user)
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
                               
                                <Stack direction="horizontal" gap={3} style={{width:"100%"}}>
                                    <div className='exercise-review-picture'>
                                        <img className="exercise-video-small" src={review.exercise?.image_ref} alt={review.exercise?.title} style={{display: 'block', margin: 'auto'}}/>
                                    </div>
                                        <div className='individual-review'>
                                            <Stack direction="horizontal" gap={3}>
                                                <div className='profile-review-profile'>
                                                    <Stack direction="horizontal" gap={3}>
                                                        <p className='profile-review-image'></p>
                                                        <div>
                                                            <p className="profile-review-name">Joseph Ma</p>
                                                            <p className='profile-review-date'>{review.date}</p>
                                                        </div>
                                                    </Stack>
                                                    <Rating name="half-rating-read" value={review.rating} precision={0.5} size="large" readOnly />
                                                </div>
                                                <p className='profile-review-text'>{review.comments}</p>
                                                <p></p>
                                            </Stack> 
                                        </div>
                                    <div>
                                        <button className="delete-review" onClick={() => {
                                            DeleteDoc("Review", review.id).then(status => console.log("TE")).catch(err => console.log(err))
                                            onDelete();
                                        }}>
                                            <DeleteIcon/>
                                        </button>
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