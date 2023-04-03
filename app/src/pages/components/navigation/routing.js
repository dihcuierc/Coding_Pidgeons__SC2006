import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Login from "../../authentication/login/Login"
import NotFound from "../../error/NotFound";
import Register from "../../authentication/register/Register"
import Forget from "../../authentication/login/Forget";
import Facilities from "../../facilities/ExerciseFacilities/Facilities";
import Profile from "../../profile/Profile";
import ExercisePlan from '../../exercise/plans/ExercisePlan';
import ExerciseCarousel from '../utilities/carousel/ExerciseCarousel';
import Exercise from '../../exercise/Exercise';
import Workout from '../../workout/Workout';
import ScheduleExercise from '../../exercise/schedule/ScheduleExercise';
import ViewGoals from '../../goals/View/ViewGoals';
import AddGoals from '../../goals/Add/addGoals';
import EditGoals from "../../goals/Edit/editGoals";
import ExerciseReview from "../../review/ExerciseReview";
import AddExerciseReview from "../../review/Add/AddExerciseReview"
import AddExercise from "../../exercise/plans/add/AddExercisePlans";
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
                    <Route index element={<ViewGoals/>}/>
                    <Route path="add" element={<AddGoals/>}/>
                    <Route path=":id" element={<EditGoals/>}>
                    </Route>
                </Route>
                <Route path="password">
                    <Route path="forget" element={<Forget/>}/>
                </Route>
                <Route path="workout">
                    <Route index element={<Workout/>}/>
                    <Route path="schedule">
                        <Route index element={<ScheduleExercise/>}/>
                        <Route path=":id" element={<ScheduleExercise/>}/>
                    </Route>
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