import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles.css";

export default function AutoComplete({ word, children, onClick }) {
  const [words, setWords] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:7000/api/school?term=${word}`)
      .then((result) => {
        //console.log(result.data.name);
        setWords(result.data.name);
      });
  }, [word]);
  return (
    <div className="input-auto-complete">
      {children}
      <div className="auto-complete">
        {words &&
          words.map((value, index) => (
            <div
              className="auto-word-bar"
              key={index}
              onClick={() => onClick(value)}
            >
              {value}
            </div>
          ))}
      </div>
    </div>
  );
}
