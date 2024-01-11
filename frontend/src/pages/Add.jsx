import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Add() {
  //Setting the initial state of paint to be empty, this will be updated on the call of setPaint
  const [paint, setPaint] = useState({
    title: "",
    description: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setPaint((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    // Prevent default makes sure that the buttons defualt behaviour doest happen and then we define what it should do below.
    e.preventDefault();
    try {
      //Allows to make any API request using a React App
      await axios.post("http://localhost:8800/paints", paint);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(paint);
  return (
    <div className="form">
      <h1> Add New Paint </h1>
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
      <button className="formButton" onClick={handleClick}> Add </button>
    </div>
  );
}
