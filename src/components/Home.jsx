import React from "react";
import "../style/home.css";

const Home = () => {
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
        <button className="todo-button">To Do List</button>
      </div>
    </div>
  );
};

export default Home;
