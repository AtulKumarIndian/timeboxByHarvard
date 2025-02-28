import React, { useState, useEffect } from "react";
import "./Timebox.css";

const AnalogClock = ({ time }) => {
  const secondsDeg = (time.getSeconds() / 60) * 360;
  const minutesDeg = (time.getMinutes() / 60) * 360;
  const hoursDeg = ((time.getHours() % 12) / 12) * 360;

  return (
    <div className="analog-clock">
      <div className="clock-face">
        <div className="hand hour-hand" style={{ transform: `rotate(${hoursDeg}deg)` }}></div>
        <div className="hand minute-hand" style={{ transform: `rotate(${minutesDeg}deg)` }}></div>
        <div className="hand second-hand" style={{ transform: `rotate(${secondsDeg}deg)` }}></div>
      </div>
    </div>
  );
};

const Timebox = () => {
  const [schedule, setSchedule] = useState(Array(18).fill(""));
  const [day, setDay] = useState("");
  const [goals, setGoals] = useState("");
  const [todo, setTodo] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [time, setTime] = useState(new Date());

  // Load stored data from localStorage when component mounts
  useEffect(() => {
    const storedSchedule = JSON.parse(localStorage.getItem("schedule")) || Array(18).fill("");
    const storedDay = localStorage.getItem("day") || "";
    const storedGoals = localStorage.getItem("goals") || "";
    const storedTodo = localStorage.getItem("todo") || "";
    const storedDarkMode = localStorage.getItem("darkMode") === "true";

    setSchedule(storedSchedule);
    setDay(storedDay);
    setGoals(storedGoals);
    setTodo(storedTodo);
    setDarkMode(storedDarkMode);

    // Update time every second
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Save values to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("schedule", JSON.stringify(schedule));
  }, [schedule]);

  useEffect(() => {
    localStorage.setItem("day", day);
  }, [day]);

  useEffect(() => {
    localStorage.setItem("goals", goals);
  }, [goals]);

  useEffect(() => {
    localStorage.setItem("todo", todo);
  }, [todo]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleChange = (index, value) => {
    const newSchedule = [...schedule];
    newSchedule[index] = value;
    setSchedule(newSchedule);
  };

  return (
    <div className={`timebox-container ${darkMode ? "dark" : "light"}`}>
      <div className="header">
        <h1>Timebox</h1>
        <p> - by Harvard</p>
        <AnalogClock time={time} />
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <div className="content">
        <div className="left-panel">
          <label>Date</label>
          <input 
            type="date" 
            className="day-input" 
            value={day} 
            onChange={(e) => setDay(e.target.value)} 
          />
          <label>Top Daily Goals</label>
          <textarea 
            className="goals-input" 
            value={goals} 
            onChange={(e) => setGoals(e.target.value)} 
            placeholder="Enter goals in priority..."
          ></textarea>
          <label>Brain Dump (To-Do List)</label>
          <textarea 
            className="todo-input" 
            value={todo} 
            onChange={(e) => setTodo(e.target.value)} 
            placeholder="Enter tasks to complete..."
          ></textarea>
        </div>
        <div className="right-panel">
          <label>Daily Schedule</label>
          <div className="schedule-grid">
            {[...Array(18)].map((_, index) => (
              <div key={index} className="schedule-row">
                <div className="time-label">{index + 5}:00</div>
                <div className="task-input-container">
                  <input 
                    type="text" 
                    value={schedule[index]} 
                    onChange={(e) => handleChange(index, e.target.value)} 
                    placeholder="Enter task..." 
                    className="schedule-input"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timebox;
