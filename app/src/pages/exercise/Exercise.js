import background from "../../assets/css/Background.module.css"
import React from 'react';
import './Exercise.css';


export default function Exercise( exercise ) {

    return (
        <div className={background.default}>
             <div className="exercise-container">
                <div className="exercise-left">
                    <h2 className="exercise-title">Title</h2>
                    <p className="exercise-bodypart">Arm Exercise</p>
                    <p>image</p>
                </div>
                <div className="exercise-right">
                    <div className="exercise-how-to">
                        <h3 className="how-to-title">How To</h3>
                        <p className='how-to-description'>Sit on an incline bench and hold a dumbbell in each hand at arm's length. Use your biceps to curl the dumbbell until it reaches your shoulder, then lower them back down to your side and repeat.
                        </p>
                    </div>
                    <div className="exercise-why">
                        <h3 className="why-title">Why</h3>
                        <p className="why-description">Beware: this position isolates the biceps and prevents other muscles from sharing the load. You can work the entire muscle by turning your wrists out slightly and keeping your elbows pointed towards the floor throughout the rep, a range of motion not available in other arm exercises.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
