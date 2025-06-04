import React, { useEffect, useState } from "react";
import "../style/update.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
const Update = ({ update: display, updateInputs }) => {
  const [inputs, setInputs] = useState({ title: "", description: "" });

  useEffect(() => {
    setInputs({
      title: updateInputs.title || "",
      description: updateInputs.description || "",
    });
  }, [updateInputs]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = async () =>{
    try {
      await axios.put(`http://localhost:3000/api/user/update/${updateInputs._id}`,inputs).then((res)=>{
      console.log(res);
      toast.success(res.data.message);
    });
    } catch (error) {
      toast.error(error.response.data.message);
    }
    console.log(updateInputs._id);
    display("none");
  }

  return (
    <div className="update-box">
  <ToastContainer autoClose={3000}/>
  <h2>Update</h2>
  <input
    type="text"
    name="title"
    id="title"
    value={inputs.title}
    onChange={handleChange}
  />
  <textarea
    name="description"
    id="text-content"
    value={inputs.description}
    onChange={handleChange}
  ></textarea>
  <div className="button-row">
    <button className="update-btn" onClick={submit}>Update</button>
    <button className="close-btn" onClick={() => display("none")}>Close</button>
  </div>
</div>

  );
};

export default Update;
