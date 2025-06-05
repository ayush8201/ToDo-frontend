import React from "react";
import "../style/home.css";
import { useNavigate } from "react-router-dom";


const Home = () => {
  let history = useNavigate();
  return (
    <div className="home">
      <div className="container">
        <h1>
          Organize your work and life <br /> in one place
        </h1>
        <p>
          Capture, organize, and access your notes anytime with ease. Perfect
          for students, professionals, and creators—our clean, simple interface
          keeps your ideas safe, searchable, and always within reach.
        </p>
        <button className="todo-button" onClick={() => history("/todo")}>To Do List</button>
      </div>
    </div>
  );
};

export default Home;
