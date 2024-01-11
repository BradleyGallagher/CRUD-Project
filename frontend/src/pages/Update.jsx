import React from "react";
import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function Update() {
  //Setting the initial state of paint to be empty, this will be updated on the call of setPaint
  const [paint, setPaint] = useState({
    title: "",
    description: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const paintId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setPaint((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      //Allows to make any API request using a React App
      await axios.put("http://localhost:8800/paints/"+ paintId, paint);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(paint);
  
  return (
    <div className="form">
      <h1>  Update New Paint </h1>
      <input
        type="text"
        placeholder="title"
        onChange={handleChange}
        name="title"
      ></input>
      <input
        type="text"
        placeholder="description"
        onChange={handleChange}
        name="description"
      ></input>
      <input
        type="number"
        placeholder="price"
        onChange={handleChange}
        name="price"
      ></input>
      <input
        type="text"
        placeholder="cover"
        onChange={handleChange}
        name="cover"
      ></input>
      <button className="formButton" onClick={handleClick}> Update </button>
    </div>
  );
}
