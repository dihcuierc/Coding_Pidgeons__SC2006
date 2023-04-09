import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Link, Outlet} from 'react-router-dom';
import Carousel from "react-multi-carousel";

import SearchBar from '../components/utilities/searchbar/SearchBar'
import ExerciseCard from "../components/utilities/carousel/exercise/ExerciseCard";

import background from "../../assets/css/Background.module.css"
import './Workout.css';

import {collection, onSnapshot} from "firebase/firestore";
import {initializeFirebase} from "../../provider/FirebaseConfig";
import {GetCollection} from "../../provider/firestore/FirestoreProvider";
import {useAuth} from "../../provider/auth/AuthProvider";

const {db} = initializeFirebase();
export default function Workout() {
    const [plans, setPlans] = useState([]);
    const [groups,setGroups] = useState([]);
    const {user} = useAuth();

    const fetchGroup = useCallback(() => {
        GetCollection("ExerciseGroups").then((data) => {
            setGroups(data);
        }).catch(err => {
            console.log(err);
        })
    },[])


    useEffect( () => {
        const planRef = collection(db,"Plan");
        const unsub = onSnapshot(planRef, (snapshot) => {
            const data = [];
            snapshot.forEach((doc) => {
                data.push({...doc.data(), id: doc.id})
            })
            setPlans(data);
        });
        if (!groups.length)
            fetchGroup();
        return () =>
            unsub();
    },[fetchGroup, groups.length, plans, plans.length]);


    return (
        <div className={background.default}>
            <div className="workout-greeting">
                <h1 className='workout-title'>Hello, {user?.name}</h1>
                <p className="workout-question">What would you like to do?</p>
            </div>  
            <div className="carousel-container">
              <div className="header-container">
                <div className='exercise-plan'>
                  <h1>Exercise Plan</h1>
                  <Link to="plans/add">
                    <button className="button schedule-exercise-btn">Add Exericse Plan</button>
                  </Link>
                </div>
                <Link to="schedule" style={{paddingRight: '5rem'}}>
                  <button className="button schedule-exercise-btn">Schedule Exercise</button>
                </Link>
              </div>
              <Carousel responsive={responsive} showDots={true} infinite={true}>
                {plans.map((plan) => (
                  <ExerciseCard link={`plans/${plan.id}`} key={plan.id} title={plan.title} imageUrl={plan['image_ref']}/>
                ))}
              </Carousel>
            </div>

            <div className="carousel-container">
              <h1>Exercises</h1>
              <Carousel responsive={responsive} showDots={true} infinite={true}>
                  {groups.map((exerciseGroup) => (
                    <ExerciseCard link={`views/${exerciseGroup.id}`} key={exerciseGroup.id} title={exerciseGroup.title} imageUrl={exerciseGroup['image_ref']}/>
                  ))}
              </Carousel>
            </div>
            <Outlet />
        </div>
    )
}

const responsive = {
desktop: {
  breakpoint: { max: 3000, min: 1024 },
  items: 4,
  slidesToSlide: 1 // optional, default to 1.
},
tablet: {
  breakpoint: { max: 1024, min: 464 },
  items: 2,
  slidesToSlide: 1 // optional, default to 1.
},
mobile: {
  breakpoint: { max: 464, min: 0 },
  items: 1,
  slidesToSlide: 1 // optional, default to 1.
}
};