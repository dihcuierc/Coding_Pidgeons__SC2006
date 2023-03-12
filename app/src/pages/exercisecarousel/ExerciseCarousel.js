import background from "../../assets/css/Background.module.css";
import "../workout/Workout.css";
import React from "react";
import exerciseData from "../../data/exerciseData.json";
import exerciseGroupData from "../../data/exerciseGroupData.json";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ExerciseCard from "../workout/ExerciseCard";
import { useParams } from "react-router-dom";

export default function ExerciseCarousel() {
  const { id } = useParams();

  const filteredExercises = exerciseData.filter((exercise) => {
    return exercise["exercise-group-id"] === parseInt(id);
  });

  if(filteredExercises.length === 0) {
    return <div>Exercises not found!</div>;
  }

  const exerciseGroup = exerciseGroupData.find((exerciseGroup) => exerciseGroup.id === filteredExercises[0]["exercise-group-id"]);

  return (
    <div className={background.default}>
      <div className="carousel-container">
        <h1>{exerciseGroup.title}</h1>
        <Carousel responsive={responsive} showDots={true} infinite={true}>
          {filteredExercises.map((exercise) => (
            <ExerciseCard
              link={`/workout/exerciseview/exercise/${exercise.id}`}
              key={exercise.id}
              imageUrl={exercise.path}
              title={exercise.alt}
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
