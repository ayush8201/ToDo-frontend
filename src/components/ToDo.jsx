import React, { useEffect, useState } from "react";
import "../style/todo.css";
import Todo_item from "./Todo_item";
import { ToastContainer, toast } from "react-toastify";
import Update from "./Update";
import { useSelector } from "react-redux";
import axios from "axios";

const ToDo = () => {
  const id = sessionStorage.getItem("id");
  const [updateInputs, setUpdateInputs] = useState({})
  const [toDo, setToDo] = useState({ title: "", content: "" });
  const [array, setArray] = useState([]);

  // ✅ Fetch todos when component mounts

  const handleChange = (e) => {
    setToDo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const show = () => {
    document.getElementById("content").style.display = "block";
  };

  const submit = async () => {
    if (toDo.title === "" || toDo.content === "") {
      toast.error("Enter the title and content");
      return;
    }

    try {
      if (id) {
        const res = await axios.post("https://to-do-backend-h4di.vercel.app/api/user/create", {
          title: toDo.title,
          description: toDo.content,
          id,
        });

        const newTodo = res.data.list;
       
        setArray((prevArray) => [...prevArray, newTodo]);
        toast.success("Todo added successfully");
      } else {
         setArray((prevArray) => [...prevArray, toDo]);
         toast.warn("Task added locally. Please sign in to save it permanently.");
          
      }
    } catch (err) {
      console.error("Error adding todo:", err.message);
      toast.error("Failed to save your task");
    }

    setToDo({ title: "", content: "" });
  };

  const del = async (_id) => {
    if(id)
    {
       console.log(_id);
    await axios.delete(`https://to-do-backend-h4di.vercel.app/api/user/delete/${_id}`,{data:{id:id}}).then((res) => {
      toast.success(res.data.message);
    });
    }
    else{
        toast.error("Please sign in first");
    }
   
  };

  const update = (value) => {
    document.getElementById("todo-update").style.display = value;
  };

  const toUpdate = (index)=>{
    
    setUpdateInputs({...array[index]});
  }

  const showTodo = (item, index) => (
    <Todo_item
      key={item._id || index}
      index={item._id}
      item={item}
      del={del}
      update={update}
      updateId = {index}
      toUpdate = {toUpdate}
    />
  );
  
  useEffect(() => {
    const fetchTodos = async () => {
      if (id) {
        try {
          const res = await axios.get(
            `https://to-do-frontend-ivory-mu.vercel.app/api/user/getlist/${id}`
          );
          if (res.data.list) {
            setArray(res.data.list);
             // ✅ Set the fetched list
          }
        } catch (err) {
          console.error("Failed to fetch todos:", err.message);
        }
      }
    };
    fetchTodos();
  }, [submit]);

  return (
    <>
      <div className="todo">
       
        <div className="todo-main d-flex flex-col justify-content-center align-items-center">
           <ToastContainer autoClose={3000} />
          <div className="input-container d-flex flex-col w-50">
            <input
              style={{ outline: "none", border: "none" }}
              type="text"
              placeholder="Title"
              onClick={show}
              onChange={handleChange}
              value={toDo.title}
              name="title"
              className="todo-inputs"

            />
            <textarea
              style={{ outline: "none", border: "none" }}
              name="content"
              id="content"
              onChange={handleChange}
              value={toDo.content}
              className="todo-inputs"
              placeholder="Enter the content"
            ></textarea>
          </div>
          <div
            onClick={submit}
            className="todo-btn my-3 d-flex flex-row justify-content-end w-50"
          >
            <button className="bg-stone-600 hover:bg-stone-900 text-white font-bold py-2 px-4 border border-stone-900 rounded">
              Add
            </button>
          </div>
        </div>
        <div className="todo-body">{array.map(showTodo)}</div>
      </div>
      <div className="todo-update" id="todo-update">
        <Update update={update} updateInputs={updateInputs} />
      </div>
    </>
  );
};

export default ToDo;
