import React, {useState} from "react";
import { MdThumbUp, MdThumbDown } from "react-icons/md";
import moment from "moment";

const Card = ({person, isGrid, windowWidth, onUpdate}) => {

    const [vote, setVote] = useState(null);
    const [isPressed, setIsPressed] = useState(false);
    let votep = person.votes.positive;
    let voten = person.votes.negative;

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

    const handleSubmit = async () => {
        if (!!vote && !isPressed) {
          let {positive, negative} = person.votes;
          vote === "positive" && (positive++);
          vote === "negative" && (negative++);    
          const res = await fetch(`${process.env.REACT_APP_API}/people/${person._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              votes: {
                positive,
                negative
              },
            }),
          });
          onUpdate(person.id, {positive, negative} );
          setVote(null);
          setIsPressed(true);
        }
    };  
    const handleSetVote = val => setVote(val);

    return (
        <div
          className="slider__card card"
          style={
            isGrid
              ? {
                  background:
                    windowWidth >= 650
                      ? `linear-gradient(90deg, rgba(217,217,217,0.28895308123249297) 7%, rgba(189,189,189,1) 21%, rgba(112,112,112,1) 50%, rgba(189,189,189,1) 100%), url(${person.picture}) -12% 10% no-repeat`
                      : `linear-gradient(90deg, rgba(89,87,87,0.6) 0%, rgba(112,112,112,0.6) 100%), url(${person.picture}) 100% 100% no-repeat`,
                }
              : {
                  background:
                    windowWidth >= 650
                      ? `linear-gradient(90deg, rgba(89,87,87,0.6) 0%, rgba(112,112,112,0.6) 100%), url(${person.picture}) 100% 100% no-repeat`
                      : `linear-gradient(90deg, rgba(89,87,87,0.6) 0%, rgba(112,112,112,0.6) 100%), url(${person.picture}) 100% 100% no-repeat`,
                }
          }
        >
          <div
            className={
              voteResult ? "vote-result__positive" : "vote-result__negative"
            }
          >
            {voteResult ? (
              <MdThumbUp className="people-card__result-icon" size="20" />
            ) : (
              <MdThumbDown className="people-card__result-icon" size="20" />
            )}
          </div>

          <div className="people-card__date">
            <span className="people-card__magic-date">
              {!isPressed ? `${moment(person.lastUpdated).fromNow()} in ${person.category}` : "Thank for your Vote!"}
            </span>
            <div className="people-card__buttons">
              <button
                className="icon-button separate-button"
                aria-label="thumbs up"
                value="positive"
                onClick={() => handleSetVote("positive")}
              >
                <MdThumbUp className="m-auto text-white p-5" size="30" />
              </button>
              <button
                className="icon-button separate-button"
                aria-label="thumbs down"
                value="negative"
                onClick={() => handleSetVote("negative")}
              >
                <MdThumbDown className="text-white" size="30" />
              </button>
              <button
                className="vote-button separate-button"
                aria-label="vote now"
                onClick={() => handleSubmit()}
              >
                {!isPressed ? "Vote Now" : "Vote Added"}
              </button>
            </div>
          </div>

          <div className="people-card__info">
            <h2 className="people-card__name">{person.name}</h2>
            <p className="people-card__description">{person.description}</p>
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
}
export default Card;