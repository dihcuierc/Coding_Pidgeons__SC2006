import background from "../../assets/css/Background.module.css"
import '../workout/Workout.css';
import React from 'react';
import exercsieData from "./exerciseData.json";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ExerciseCard from "../workout/ExerciseCard";

export default function ExerciseCarousel() {
    return (
        <div className={background.default}>
            <div className="carousel-container">
              <h1>Arms</h1>
              <Carousel responsive={responsive} showDots={true} infinite={true}>
                  {exercsieData.map((exercise) => (
                    <ExerciseCard link="exercise" key={exercise.id} imageUrl={exercise.path} title={exercise.alt} />
                  ))}
              </Carousel>
            </div>
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