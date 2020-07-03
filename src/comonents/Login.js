import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../Styles.css";
import axios from "axios";
import Loading from "./Loading";
import { LOGIN } from "../actions/user.action";
import { useDispatch } from "react-redux";
import Flash, { activeFlash, clearFlash } from "./Flash";
import { ERROR } from "../actions/flash.action";

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = async () => {
    //console.log(`email:${email} , password:${password}`);
    if (email === "" || password === "") {
      activeFlash(dispatch, ERROR, "Both fields must be filled out");
      return;
    }
    if (!email.match(/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/g)) {
      activeFlash(dispatch, ERROR, "Invalid email address");
      return;
    }
    setLoading(true);
    let res;
    try {
      res = await axios.post(
        "http://localhost:7000/api/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.error(error);
    }
    if (res && res.data.find) {
      //console.log(`user_id : ${res.data.user_id} , name : ${res.data.name}`);
      dispatch({
        type: LOGIN,
        payload: { user_id: res.data.user_id, name: res.data.name },
      });
      history.push("/");
      return;
    } else {
      activeFlash(dispatch, ERROR, "Incorrect password");
      //console.log("Not Found");
    }
    setLoading(false);
  };

  useEffect(() => {
    return () => {
      clearFlash(dispatch);
    };
  }, [dispatch]);

  return (
    <div className="container">
      <h1>Please Log In</h1>
      <Flash />
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="form-filed">
          <div className="form-name">
            <label htmlFor="email">Email</label>
            <label htmlFor="password">Password</label>
          </div>
          <div className="form-value">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              style={{ width: "240px" }}
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              style={{ width: "240px" }}
            />
          </div>
        </div>
        <div className="form-button">
          <input type="submit" value="Login" onClick={login} />
          <input
            type="button"
            value="Cancel"
            onClick={() => {
              history.push("/");
            }}
          />
        </div>
      </form>
      {loading && <Loading />}
    </div>
  );
}
