import React from "react";
import AutoComplete from "./AutoComplete";

export default function Education({ education, setEducation }) {
  return (
    <div
      style={{
        padding: "5px",
        margin: "0 5%",
      }}
    >
      {education.map((value, index) => {
        return (
          <div className="form-filed" style={{ margin: "5px 0" }} key={index}>
            <div className="form-name">
              <label htmlFor="year">Year:</label>
              <label htmlFor="name">School:</label>
            </div>
            <div className="form-value">
              <input
                type="number"
                name="year"
                value={value.year}
                onChange={(event) => {
                  let edu = education.slice();
                  edu[index].year = event.target.value;
                  setEducation(edu);
                }}
              />

              <AutoComplete
                word={education[index].name}
                onClick={(value) => {
                  let edu = education.slice();
                  edu[index].name = value;
                  setEducation(edu);
                }}
              >
                <input
                  type="text"
                  name="name"
                  value={value.name}
                  onChange={(event) => {
                    let edu = education.slice();
                    edu[index].name = event.target.value;
                    setEducation(edu);
                  }}
                  autoComplete="off"
                />
              </AutoComplete>
            </div>
            <input
              type="button"
              value="-"
              style={{
                width: "35px",
                height: "35px",
                fontSize: "20px",
                fontWeight: 800,
                margin: "auto 12px",
              }}
              onClick={() => {
                let edu = [
                  ...education.slice(0, index),
                  ...education.slice(index + 1),
                ];
                setEducation(edu);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
