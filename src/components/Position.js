import React from "react";

export default function Position({ position, setPosition }) {
  return (
    <div
      style={{
        padding: "5px",
        margin: "0 5%",
      }}
    >
      {position.map((value, index) => (
        <div className="form-filed" style={{ margin: "5px 0" }} key={value.key}>
          <div className="form-name">
            <label htmlFor="year">Year:</label>
          </div>
          <div className="form-value">
            <input
              type="number"
              name="year"
              value={value.year}
              onChange={(event) => {
                let pos = position.slice();
                pos[index].year = event.target.value;
                setPosition(pos);
              }}
            />
            <textarea
              name="description"
              cols="80"
              rows="8"
              onChange={(event) => {
                let pos = position.slice();
                pos[index].description = event.target.value;
                setPosition(pos);
              }}
              value={value.description}
            ></textarea>
          </div>
          <input
            type="button"
            value="-"
            style={{
              width: "35px",
              height: "35px",
              fontSize: "20px",
              fontWeight: 800,
              margin: "12px",
            }}
            onClick={() => {
              let pos = [
                ...position.slice(0, index),
                ...position.slice(index + 1),
              ];
              setPosition(pos);
            }}
          />
        </div>
      ))}
    </div>
  );
}
