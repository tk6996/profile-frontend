import React from "react";
import "../Styles.css";
export default function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        backgroundColor: "#9999",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
      }}
    >
      <div className="loader"></div>
    </div>
  );
}
