import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Paints = () => {
  const [paints, setPaints] = useState([]);

  useEffect(() => {
    const fetchAllPaints = async () => {
      try {
        const response = await axios.get("http://localhost:8800/paints");
        // Axios is a method used for the frontend to interact with the backend via an api call
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
