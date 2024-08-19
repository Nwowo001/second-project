import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import "./ToDo.css";

function ToDo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask(event) {
    event.preventDefault();
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  }

  function editTask(index) {
    setIsEditing(index);
    setEditedTask(tasks[index]);
  }

  function handleEditChange(event) {
    setEditedTask(event.target.value);
  }

  function saveTask(index) {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? editedTask : task
    );
    setTasks(updatedTasks);
    setIsEditing(null);
    setEditedTask("");
  }

  return (
    <div className="to-do-list">
      <form>
        <h1>To-Do List</h1>
        <div className="inputs">
          <input
            type="text"
            placeholder="Enter a task..."
            value={newTask}
            onChange={handleInputChange}
          />
          <button className="add-button" onClick={addTask}>
            Add
          </button>
        </div>
        <ol>
          {tasks.map((task, index) => (
            <li key={index}>
              {isEditing === index ? (
                <div>
                  <input
                    type="text"
                    value={editedTask}
                    onChange={handleEditChange}
                  />
                  <button onClick={() => saveTask(index)}>Save</button>
                </div>
              ) : (
                <div>
                  <span className="text">{task}</span>
                  <div
                    className="delete-icon"
                    onClick={() => deleteTask(index)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </div>
                  <div className="edit-icon" onClick={() => editTask(index)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </div>
                </div>
              )}
            </li>
          ))}
        </ol>
      </form>
    </div>
  );
}

export default ToDo;
