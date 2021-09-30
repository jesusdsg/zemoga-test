import React, { useState, useEffect } from "react";
import { MdThumbUp, MdThumbDown } from "react-icons/md";

const People = () => {
  //Media Query
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  //Calling the API from .env
  const API = process.env.REACT_APP_API;

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


  //Votes
  var vote = "";
  var voteP = 0;
  var voteN = 0;

  const getVote = async (value) => {
    vote = value;
  };

  const handleVote = async (id) => {
    handleClick();
    //console.log(id);
    const res = await fetch(`${API}/people/${id}`);
    const data = await res.json();
    if (vote === "positive") {
      let added = data.votes.positive + 1;
      console.log(added);
      voteP = added;
      voteN = data.votes.negative;
    } else {
      let added = data.votes.negative + 1;
      console.log(added);
      voteN = added;
      voteP = data.votes.positive;
    }
    sendVote(id);
    vote = "";
    voteP = 0;
    voteN = 0;
    loadData();
  };

  const sendVote = async (id) => {
    if (vote !== "" || vote !== 0 || vote !== null) {
      //console.log('entró al send')
      const res = await fetch(`${API}/people/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          votes: {
            positive: voteP,
            negative: voteN,
          },
        }),
      });
    }
  };

  //Loading data
  const loadData = async () => {
    const res = await fetch(`${API}/people`);
    const data = await res.json();
    setPeople(data);
    console.log(people);
  };

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

  const [isPressed, setIsPressed] = useState(false);

  const onPressed = () => {
    setIsPressed(!isPressed);
 }

  const handleClick = (index) =>{
    onPressed(index);
  }


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
        {people.map((index, i) => {
          let today = new Date();
          let date = new Date(index.lastUpdated);
          let diff = today.getTime() - date.getTime();
          let days = Math.round(diff / (1000 * 60 * 60 * 24));
          let months = Math.floor(days / 31);
          //let years = Math.floor(months/12);
          let magicDate = months + " Months ago in " + index.category;
          let votep = index.votes.positive;
          let voten = index.votes.negative;

          let sum = votep + voten;
          let pp = (votep / sum) * 100;
          pp = Math.round(pp);
          let pn = (voten / sum) * 100;
          pn = Math.round(pn);

          let voteResult = "";

          if (pp > pn) {
            voteResult = true;
          } else {
            voteResult = false;
          }
          return (
            <div
              key={i}
              className="slider__card card"
              style={isGrid ? {
                background:
                  windowWidth >= 650
                    ? `linear-gradient(90deg, rgba(217,217,217,0.28895308123249297) 7%, rgba(189,189,189,1) 21%, rgba(112,112,112,1) 50%, rgba(189,189,189,1) 100%), url(${index.picture}) -5% 10% no-repeat`
                    : `linear-gradient(90deg, rgba(89,87,87,0.6) 0%, rgba(112,112,112,0.6) 100%), url(${index.picture}) 100% 100% no-repeat`,
              } : {background:
                windowWidth >= 650
                  ? `linear-gradient(90deg, rgba(89,87,87,0.6) 0%, rgba(112,112,112,0.6) 100%), url(${index.picture}) 100% 100% no-repeat`
                  : `linear-gradient(90deg, rgba(89,87,87,0.6) 0%, rgba(112,112,112,0.6) 100%), url(${index.picture}) 100% 100% no-repeat`,} }
            >
              <div
                className={
                  voteResult ? "vote-result__positive" : "vote-result__negative"
                }
              >
                {
                  voteResult ? <MdThumbUp className="people-card__result-icon" size="20"/> : <MdThumbDown className="people-card__result-icon" size="20"/>
                }
              </div>

              <div className="people-card__date">
                <span className="people-card__magic-date" id={i}>{!isPressed ? magicDate : 'Thank for your Vote!'}</span>
                <div className="people-card__buttons">
                  <button
                    className="icon-button separate-button"
                    aria-label="thumbs up"
                    value="positive"
                    onClick={() => getVote("positive")}
                  >
                    <MdThumbUp className="m-auto text-white p-5" size="30" />
                  </button>
                  <button
                    className="icon-button separate-button"
                    aria-label="thumbs down"
                    value="negative"
                    onClick={() => getVote("negative")}
                  >
                    <MdThumbDown className="text-white" size="30" />
                  </button>
                  <button
                    className="vote-button separate-button"
                    aria-label="vote now"
                    id={i}
                    key={i}
                    onClick={() => handleVote(`${index._id}`)}
                  >
                    {!isPressed ? 'Vote Now': 'Vote Again'}
                  </button>
                </div>
              </div>

              <div className="people-card__info">
                <h2 className="people-card__name">{index.name}</h2>
                <p className="people-card__description">{index.description}</p>
              </div>
              <div className="people-card__vote-container">
                <div
                  className="vote-container__leftside"
                  style={{ width: `${pp}%` }}
                >
                  <MdThumbUp className="text-white" /> {pp}%
                </div>
                <div
                  className="vote-container__rightside"
                  style={{ width: `${pn}%` }}
                >
                  {pn}% <MdThumbDown className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default People;
