import React, { useState } from "react";
import background from "../../../assets/css/Background.module.css";
import padding from "../../../assets/css/Padding.module.css";
import "./AddExercise.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import exerciseGroups from "../../../data/exerciseGroupData.json";

export default function AddExercise() {
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseGroup, setExerciseGroup] = useState("");
  const [picture, setPicture] = useState(null);
  const [instructions, setInstructions] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleExerciseNameChange = (event) => {
    setExerciseName(event.target.value);
  };

  const handleExerciseGroupChange = (event) => {
    const { name, group } = event.target.value;

    setExerciseGroup((prevValue) => {
      if (group === "new") {
        return group;
      }
      return prevValue;
    });
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
    // Add code to save the exercise to a database or send it to a server
  };

  const handleCancel = () => {
    // Add code to go back to the previous page
  };

  const handleSelect = (event) => {
    const selectedGroup = event.target.getAttribute("value");
    setExerciseGroup(selectedGroup);
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
              <Dropdown.Item value="new" onClick={handleSelect}>
                Add new group
              </Dropdown.Item>
            </DropdownButton>

            {exerciseGroup === "new" && (
              <input
                type="text"
                id="exerciseGroup"
                name="exerciseGroup"
                value={exerciseGroup}
                onChange={handleExerciseGroupChange}
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
      </form>
    </div>
  );
}
