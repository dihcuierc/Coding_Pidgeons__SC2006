import React, { useState } from "react";
import background from "../../../assets/css/Background.module.css";
import padding from "../../../assets/css/Padding.module.css";
import "./AddExercise.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import exerciseGroups from "../../../data/exerciseGroupData.json";
import Stack from "react-bootstrap/Stack";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddExercise() {
  const [exerciseName, setExerciseName] = useState("");
  var [exerciseGroup, setExerciseGroup] = useState("");
  const [newExerciseGroup, setNewExerciseGroup] = useState("");

  const [picture, setPicture] = useState(null);
  const [instructions, setInstructions] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const success = () => toast.success("Exercise added successfully!");
  const cancel = () => toast.error("Exercise not added.");
  const goBack = useNavigate();

  const handleExerciseNameChange = (event) => {
    setExerciseName(event.target.value);
  };

  const handleNewExerciseGroupChange = (event) => {
    setNewExerciseGroup(event.target.value);
  };

  const handlePictureChange = (event) => {
    setPicture(event.target.files[0]);
  };

  const handleInstructionsChange = (event) => {
    setInstructions(event.target.value);
  };

  const handleAdditionalInfoChange = (event) => {
    setAdditionalInfo(event.target.value);
  };

  const handleSaveExercise = (event) => {
    event.preventDefault();

    if (exerciseGroup === "New Exercise Group") {
      exerciseGroup = newExerciseGroup;
    }
    const exerciseData = {
      exerciseName: exerciseName,
      exerciseGroup: exerciseGroup,
      instructions: instructions,
      additionalInfo: additionalInfo,
    };

    const exerciseDataJSON = JSON.stringify(exerciseData);
    console.log(exerciseDataJSON);

    success();
  };

  const handleCancel = () => {
    // Add code to go back to the previous page
    cancel();

    setTimeout(() => {
        goBack(-1);
    }, 500);
  };

  const handleSelect = (event) => {
    const selectedGroup = event.target.getAttribute("id");
    const {id, value} = event.target;
    setExerciseGroup((exerciseGroup) => 
      ({...exerciseGroup, [id]: value}))
  };

  const renderDropdownItems = () => {
    return exerciseGroups.map((group) => {
      return (
        <Dropdown.Item
          key={group.id}
          value={group.title}
          onClick={handleSelect}
        >
          {group.title}
        </Dropdown.Item>
      );
    });
  };

  return (
    <div className={background.default}>
      <h1 className={padding.headerTop}>Add Exercise</h1>

      <form className="add-exercise-form" onSubmit={handleSaveExercise}>
        <div className="add-exercise-container">
          <div className="add-exercise-block">
            <label htmlFor="exerciseName">Exercise Name:</label>
            <input
              type="text"
              id="exerciseName"
              name="exerciseName"
              value={exerciseName}
              onChange={handleExerciseNameChange}
              required
            />

            <label htmlFor="exerciseGroup">Exercise Group:</label>

            <DropdownButton
              id="exercise-group"
              value={exerciseGroup}
              title={exerciseGroup ? exerciseGroup : "Select an exercise group"}
            >
              {renderDropdownItems()}
              <Dropdown.Item value="New Exercise Group" onClick={handleSelect}>
                Add new group
              </Dropdown.Item>
            </DropdownButton>

            {exerciseGroup === "New Exercise Group" && (
              <input
                type="text"
                id="exerciseGroup"
                name="exerciseGroup"
                value={newExerciseGroup}
                onChange={handleNewExerciseGroupChange}
                required
              />
            )}

            <label htmlFor="picture">Picture or Video:</label>
            <input
              type="file"
              id="picture"
              name="picture"
              accept="image/*,video/*"
              onChange={handlePictureChange}
            />
          </div>

          <Stack className="stack-column" direction="vertical">
            <div className="add-exercise-block">
              <label htmlFor="instructions">Instructions:</label>
              <textarea
                id="instructions"
                name="instructions"
                className="multiline-text"
                value={instructions}
                onChange={handleInstructionsChange}
                required
              ></textarea>

              <label htmlFor="additionalInfo">Additional Information:</label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                className="multiline-text"
                value={additionalInfo}
                onChange={handleAdditionalInfoChange}
              ></textarea>
            </div>
            <div className="add-exercise-buttons">
              <button type="submit">Save Exercise</button>
              <button
                className="cancel-button"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
            <Toaster />
          </Stack>
        </div>
      </form>
    </div>
  );
}
