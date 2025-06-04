import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "./store/index.js";

import "./App.css";
import NavBar from "./components/NavBar.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import SignUp from "./components/SignUp.jsx";
import SignIn from "./components/SignIn.jsx";
import ToDo from "./components/ToDo.jsx";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionStorage.getItem("id")) {
      dispatch(authActions.login());
    }
  }, []);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/toDo" element={<ToDo />} />
      </Routes>
    </Router>
  );
}

export default App;
