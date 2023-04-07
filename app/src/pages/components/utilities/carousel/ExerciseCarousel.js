import background from "../../../../assets/css/Background.module.css";
import "../../../workout/Workout.css";
import React, {useCallback, useEffect, useState} from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ExerciseCard from "./exercise/ExerciseCard";
import { useParams } from "react-router-dom";
import {GetCollection} from "../../../../provider/firestore/FirestoreProvider";

export default function ExerciseCarousel() {
  const { id } = useParams();

  const [exerciseGroup, setExerciseGroup] = useState([]);
  const [exercises, setExercises] = useState([])
  const [filtered, setFiltered] = useState([]);
  
  const fetchExerciseGroup = useCallback(() => {
    GetCollection("ExerciseGroups",id).then(data => setExerciseGroup(data)).catch(err => console.log(err));
  },[id])

  const fetchExercises = useCallback(() => {
    GetCollection("Exercise").then(data => 
      setExercises(data.filter(item => item['exgrp_ID'] === parseInt(id)))).catch(err => console.log(err));
  },[id])

  useEffect(() => {
    fetchExerciseGroup();
    fetchExercises();
  },[exercises, fetchExerciseGroup, fetchExercises, id])

  return (
    <div className={background.default}>
      <div className="carousel-container">
        <div className="header-container">
          <h1>{exerciseGroup.title}</h1>
        </div>
        <Carousel responsive={responsive} showDots={true} infinite={true}>
          {exercises.map((exercise) => (
            <ExerciseCard
              link={`../exercise/${exercise.id}`}
              key={exercise.id}
              imageUrl={exercise['image_ref']}
              title={exercise.title}
              addExercise={true}
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
