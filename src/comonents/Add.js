import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../Styles.css";
import Education from "./Education";
import Position from "./Position";
import Loading from "./Loading";
import axios from "axios";
import Flash, { activeFlash, clearFlash } from "./Flash";
import { ERROR, SUCCESS } from "../actions/flash.action";

export default function Add() {
  const [finish, setFinish] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [headline, setHeadline] = useState("");
  const [summary, setSummary] = useState("");
  const [education, setEducation] = useState([]);
  const [position, setPosition] = useState([]);
  const addEducation = () => {
    if (education.length < 9)
      setEducation([...education, { year: "", name: "" }]);
    else alert("Maximum of nine education entries exceeded");
  };

  const addPosition = () => {
    if (position.length < 9)
      setPosition([
        ...position,
        { year: "", description: "", key: Number(new Date()) },
      ]);
    else alert("Maximum of nine position entries exceeded");
  };

  const checkAllfiledRequire = () => {
    const checkfiledEducation = () => {
      for (let edu of education) {
        if (edu.year && edu.name) {
          continue;
        }
        return false;
      }
      return true;
    };
    const checkfiledPosition = () => {
      for (let pos of position) {
        if (pos.year && pos.description) {
          continue;
        }
        return false;
      }
      return true;
    };
    return (
      firstName &&
      lastName &&
      email &&
      headline &&
      summary &&
      checkfiledEducation() &&
      checkfiledPosition()
    );
  };

  const yearEduAreNumber = () => {
    for (let edu of education) {
      if (!isNaN(edu.year)) {
        continue;
      }
      return false;
    }
    return true;
  };

  const yearPosAreNumber = () => {
    for (let pos of position) {
      if (!isNaN(pos.year)) {
        continue;
      }
      return false;
    }
    return true;
  };

  const submitForm = async (data) => {
    try {
      return await axios.post("http://localhost:7000/api/add", data, {
        withCredentials: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const sendProfile = async () => {
    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      headline: headline,
      summary: summary,
      education: education.map((value) => ({
        year: Number(value.year),
        name: value.name,
      })),
      position: position.map((value) => ({
        year: Number(value.year),
        description: value.description,
      })),
    };
    //console.log(data);
    if (!checkAllfiledRequire()) {
      activeFlash(dispatch, ERROR, "All fields are required");
      window.scrollTo(0, 0);
      return;
    } else if (
      !email.match(/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/g)
    ) {
      activeFlash(dispatch, ERROR, "Invalid email address");
      window.scrollTo(0, 0);
      return;
    } else if (!yearEduAreNumber()) {
      activeFlash(dispatch, ERROR, "Education year must be numeric");
      window.scrollTo(0, 0);
      return;
    } else if (!yearPosAreNumber()) {
      activeFlash(dispatch, ERROR, "Position year must be numeric");
      window.scrollTo(0, 0);
      return;
    }
    setLoading(true);
    let res = await submitForm(data);
    if (res && res.data.success) {
      setFinish(true);
    } else {
      activeFlash(dispatch, ERROR, "Network Error");
      window.scrollTo(0, 0);
      console.error("Add Error");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (finish) history.push("/");
    return finish
      ? () => activeFlash(dispatch, SUCCESS, "Profile adder")
      : () => clearFlash(dispatch);
  }, [dispatch, finish, history]);

  return (
    <div className="container">
      <h1>Adding Profile for Watcharin</h1>
      <Flash />
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="form-filed">
          <div className="form-name">
            <label htmlFor="first_name">First Name: </label>
            <label htmlFor="last_name">Last Name: </label>
            <label htmlFor="email">Email: </label>
            <label htmlFor="headline">Headline: </label>
          </div>
          <div className="form-value">
            <input
              type="text"
              name="first_name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
            <input
              type="text"
              name="last_name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="text"
              name="headline"
              value={headline}
              onChange={(event) => setHeadline(event.target.value)}
            />
          </div>
        </div>
        <div className="form-filed">
          <div className="form-name" style={{ padding: "0 10px" }}>
            <label htmlFor="headline">Summary:</label>
          </div>
          <div className="form-value" style={{ padding: "0 10px" }}>
            <textarea
              name="summary"
              cols="80"
              rows="8"
              onChange={(event) => setSummary(event.target.value)}
              value={summary}
            ></textarea>
          </div>
        </div>
        <div className="form-filed" style={{ margin: "15px 0" }}>
          <div className="form-name" style={{ padding: "0 10px" }}>
            <label htmlFor="headline">Education:</label>
          </div>
          <input
            type="button"
            value="+"
            style={{
              width: "35px",
              height: "35px",
              fontSize: "20px",
              fontWeight: 800,
              margin: "3px 12px",
            }}
            onClick={addEducation}
          />
        </div>
        <Education education={education} setEducation={setEducation} />
        <div className="form-filed" style={{ margin: "15px 0" }}>
          <div className="form-name" style={{ padding: "0 10px" }}>
            <label htmlFor="headline">Position:</label>
          </div>
          <input
            type="button"
            value="+"
            style={{
              width: "35px",
              height: "35px",
              fontSize: "20px",
              fontWeight: 800,
              margin: "3px 12px",
            }}
            onClick={addPosition}
          />
        </div>
        <Position position={position} setPosition={setPosition} />
        <div className="form-button">
          <input type="submit" value="Add" onClick={sendProfile} />
          <input
            type="button"
            value="Cancel"
            onClick={() => history.push("/")}
          />
        </div>
      </form>
      {loading && <Loading />}
    </div>
  );
}
