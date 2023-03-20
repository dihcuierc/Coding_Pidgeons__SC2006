import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Login from "../../login/Login"
import NotFound from "../../error/NotFound";
import Register from "../../register/Register"
import Forget from "../../login/Forget";
import Facilities from "../../facilities/Facilities";
import Verify from "../../register/Verify";
import Profile from "../../profile/Profile";
import ExercisePlan from '../../exerciseplan/ExercisePlan';
import ExerciseCarousel from '../../exercisecarousel/ExerciseCarousel';
import Exercise from '../../exercise/Exercise';
import Workout from '../../workout/Workout';
import ScheduleExercise from '../../scheduleExercise/ScheduleExercise';
import FitnessGoals from '../../fitnessgoals/fitnessgoals';
import EditFitnessGoals from '../../fitnessgoals/editfitnessgoals';
import ExerciseReview from "../../exercise/ExerciseReview";
import AddExerciseReview from "../../exercise/AddExerciseReview"
import AddExercise from "../../exercise/addexercise/AddExercise";

function Routing() {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navbar/>}>
                <Route index element={<Profile/>}/>
                <Route path="/facilities" element={<Facilities/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}>
                    <Route path="otp" element={<Verify/>}/>
                </Route>
                <Route path="profile" element={<Profile/>}/>
                <Route path="/fitnessgoals" element={<FitnessGoals/>}/>
                <Route path="/fitnessgoals/edit" element={<EditFitnessGoals/>}/>
                <Route path="password">
                    <Route path="forget" element={<Forget/>}/>
                </Route>
                <Route path="workout" element={<Workout/>}/>
                <Route path="workout/schedule-exercise" element={<ScheduleExercise/>}/>
                <Route path="workout/exerciseplan/:id" element={<ExercisePlan/>}/>
                <Route path="workout/add-exercise" element={<AddExercise/>}/>

                <Route path="workout/exerciseview/:id" element={<ExerciseCarousel/>}/>    
                <Route path="workout/exerciseview/exercise/:id" element={<Exercise/>}/>
                <Route path="workout/exerciseview/exercise/:id/exercisereview" element={<ExerciseReview/>}/>
                <Route path="workout/exerciseview/exercise/:id/exercisereview/add" element={<AddExerciseReview/>}/>
       
                <Route path="*" element={<NotFound/>}/>
           </Route>
        </Routes>
    </BrowserRouter>
    )
}

export default Routing;