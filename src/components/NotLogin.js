import React from "react";
import { Link } from "react-router-dom";
export default function NotLogin() {
  return (
    <div className="container">
      <p>Not logged in</p>
      <p>
        <Link to="/">Back to Home</Link>
      </p>
    </div>
  );
}
