import React, { useState, useEffect } from "react";
import Card from "./Card";

const People = () => {
  //Media Query
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  //Handling the select
  const [isGrid, setGrid] = useState("false");

  const handleValueChange = (selVal) => {
    if (selVal === "grid") {
      setGrid(!isGrid);
    } else if (selVal === "list") {
      setGrid("true");
    }
  };

  //Array from db
  const [people, setPeople] = useState([]);

  //Loading data
  const loadData = async () => {
    const res = await fetch(`${process.env.REACT_APP_API}/people`);
    const data = await res.json();
    setPeople(data);
  };

  const handleUpdate = (id, votes) => {
    const updatedPeople = people.map((person, i) => {
      if (person.id === id){
        person.votes = votes;
      }
      return person
    })
    setPeople(updatedPeople);
  }

  useEffect(() => {
    loadData();
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div>
      {/* Starting with title and grid control */}
      <label className="people__main-title">Previous Rulings</label>
      <select
        className="people__select"
        onChange={(val) => handleValueChange(val.target.value)}
      >
        <option value="list">List</option>
        <option value="grid">Grid</option>
      </select>
      {/* Ending with title and grid control */}

      <div className={isGrid ? "block" : "grid"}>
        {/* Cards */}
        {people.map((person, i) => {
          return (
            <Card
              key={i}
              person={person}
              isGrid={isGrid}
              windowWidth={windowWidth}
              onUpdate={handleUpdate}
            />
          );
        })}
      </div>
    </div>
  );
};
export default People;
