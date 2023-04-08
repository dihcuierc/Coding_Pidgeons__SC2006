import {createBrowserRouter} from "react-router-dom";
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
import EditExercise from "../../exercise/plans/edit/EditExercisePlan"
import Setup from "../../authentication/register/Setup";
import Eateries from "../../facilities/Eateries/Eatries";
import {ProtectedRoute} from "../../../provider/auth/AuthLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navbar/>,
        children: [
            {
                index: true,
                element: <Facilities/>
            },
            {
                path: "profile",
                element:
                <ProtectedRoute>
                    <Profile/>
                </ProtectedRoute>
            },
            {
                path: "facilities",
                children: [
                    {
                    path: "exercise",
                    element: <Facilities/>
                    },
                    {
                        path: "eateries",
                        element: <Eateries/>
                    }]
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "register",
                children: [
                    {
                    index: true,
                    element: <Register/>
                    },
                    {
                     path: "setup",
                        element: <Setup/>
                    }]
            },
            {
                path: "goals",
                children: [
                    {
                        index: true,
                        element:
                            <ProtectedRoute>
                             <ViewGoals/>
                            </ProtectedRoute>
                    },
                    {
                        path: "add",
                        element:
                        <ProtectedRoute>
                            <AddGoals/>
                        </ProtectedRoute>
                    },
                    {
                        path: ":id",
                        element:
                        <ProtectedRoute>
                            <EditGoals/>
                        </ProtectedRoute>
                    },
                ]
            },
            {
                path: "password",
                children: [
                    {
                        path: "forget",
                        element: <Forget/>
                    }
                ]
            },
            {
                path: "workout",
                children: [
                    {
                        index: true,
                        element:
                        <ProtectedRoute>
                            <Workout/>
                        </ProtectedRoute>
                    },
                    {
                        path: "schedule",
                        children: [
                            {
                                index:true,
                                element:
                                <ProtectedRoute>
                                    <ScheduleExercise/>
                                </ProtectedRoute>
                            },
                            {
                                path: ":id",
                                element:
                                <ProtectedRoute>
                                    <ScheduleExercise/>
                                </ProtectedRoute>
                            }
                        ]
                    },
                    {
                        path: "plans",
                        children: [
                            {
                                path: ":id",
                                children: [
                                    {
                                    index: true,
                                    element:
                                    <ProtectedRoute>
                                        <ExercisePlan/>
                                    </ProtectedRoute>
                                    },
                                    {
                                        path: "edit",
                                        element:
                                        <ProtectedRoute>
                                            <EditExercise/>
                                        </ProtectedRoute>
                                    }
                                ]
                            },
                            {
                                path: "add",
                                element:
                                <ProtectedRoute>
                                    <AddExercise/>
                                </ProtectedRoute>
                            }
                        ]
                    },
                    {
                        path: "views",
                        children: [
                            {
                                path: ":id",
                                element:
                                <ProtectedRoute>
                                    <ExerciseCarousel/>
                                </ProtectedRoute>
                            },
                            {
                                path: "exercise",
                                children: [
                                    {
                                      path: ":id",
                                      children: [
                                          {
                                              index: true,
                                              element:
                                              <ProtectedRoute>
                                                  <Exercise/>
                                              </ProtectedRoute>
                                          },
                                          {
                                              path: "review",
                                              children: [
                                                  {
                                                    index: true,
                                                    element:
                                                    <ProtectedRoute>
                                                        <ExerciseReview/>
                                                    </ProtectedRoute>
                                                  },
                                                  {
                                                      path: "add",
                                                      element:
                                                      <ProtectedRoute>
                                                          <AddExerciseReview/>
                                                      </ProtectedRoute>
                                                  }
                                              ]
                                          }
                                      ]
                                    },
                                ]
                            },
                        ]
                    }
                ]
            },
        ]
    },
    {
        path: "*",
        element: <NotFound/>
    }
])
