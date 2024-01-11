import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Paints = () => {
  //Setting the initial state of paint to be empty, this will be updated on the call of setPaint
  const [paints, setPaints] = useState([]);

  //Reloads the called component (Paints) when the axios API request has been complete which fetches all data.
  useEffect(() => {
    const fetchAllPaints = async () => {
      try {
        //Allows to make any API request using a React App
        // Axios is a method used for the frontend to interact with the backend via an api call
        const response = await axios.get("http://localhost:8800/paints");
        // Allows the state of the useState to change so that the data thqat has been retrieved is injected to this component
        setPaints(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPaints();
  }, []);

  console.log(paints);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/paints/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Bradley's Paint Shop </h1>
      <div className="paints">
        {paints.map((paint) => (
          <div className="paint" key={paint.id}>
            {/* If there is a paint cover picture show the image with source paint.cover */}
            {paint.cover && <img src={paint.cover} alt="" />}
            <h2>{paint.title}</h2>
            <p>{paint.description}</p>
            <span>{paint.price}</span>
            <button className="delete" onClick={() => handleDelete(paint.id)}>
              Delete
            </button>
            <button className="update">
              <Link to={`/update/${paint.id}`}> Update </Link>{" "}
            </button>
          </div>
        ))}
      </div>
      <button>
        <Link to="Add"> Add New Paint </Link>
      </button>
    </div>
  );
};

export default Paints;
