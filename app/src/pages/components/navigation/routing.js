import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Login from "../../authentication/login/Login"
import NotFound from "../../error/NotFound";
import Register from "../../authentication/register/Register"
import Forget from "../../authentication/login/Forget";
import Facilities from "../../facilities/ExerciseFacilities/Facilities";
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
import Setup from "../../authentication/register/Setup";
import Eateries from "../../facilities/Eateries/Eatries";

function Routing() {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navbar/>}>
                <Route index element={<Profile/>}/>
                <Route path="profile" element={<Profile/>}/>
                <Route path="facilities">
                    <Route path="exercise" element={<Facilities/>}/>
                    <Route path="eateries" element={<Eateries/>}/>
                </Route>
                <Route path="login" element={<Login/>}/>
                <Route path="register">
                    <Route index element={<Register/>}/>
                    <Route path="setup" element={<Setup/>}/>
                </Route>
                <Route path="goals">
                    <Route index element={<FitnessGoals/>}/>
                    <Route path="edit" element={<EditFitnessGoals/>}/>
                </Route>
                <Route path="password">
                    <Route path="forget" element={<Forget/>}/>
                </Route>
                <Route path="workout">
                    <Route index element={<Workout/>}/>
                    <Route path="schedule" element={<ScheduleExercise/>}/>
                    <Route path="plans">
                        <Route path=":id" element={<ExercisePlan/>}/>
                        <Route path="add" element={<AddExercise/>}/>
                    </Route>
                    <Route path="views">
                        <Route path=":id" element={<ExerciseCarousel/>}/>
                        <Route path="exercise">
                            <Route path=":id">
                                <Route index element={<Exercise/>}/>
                                <Route path="review">
                                    <Route index element={<ExerciseReview/>}/>
                                    <Route path="add" element={<AddExerciseReview/>}/>
                                </Route>
                            </Route>
                        </Route>
                    </Route>
                </Route>
                <Route path="*" element={<NotFound/>}/>
           </Route>
        </Routes>
    </BrowserRouter>
    )
}

export default Routing;