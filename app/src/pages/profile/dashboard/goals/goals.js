import React from "react";
import {Toaster} from "react-hot-toast";
import GoalCard from "../../../components/utilities/cards/goals/GoalCard";

export default function Goals() {
    return (
        <GoalCard add={false} clickable/>
    )
}