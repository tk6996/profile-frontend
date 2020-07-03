import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./comonents/Home";
import Login from "./comonents/Login";
import View from "./comonents/View";
import Add from "./comonents/Add";
import Edit from "./comonents/Edit";
import NotLogin from "./comonents/NotLogin";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { LOGIN, LOGOUT } from "./actions/user.action";
import "./Styles.css";
import Delete from "./comonents/Delete";
function App() {
  const dispatch = useDispatch();
  const user = useSelector(({ UserReducer }) => UserReducer);
  useEffect(() => {
    async function authResponse() {
      try {
        let response = await axios({
          method: "GET",
          url: "http://localhost:7000/api/auth",
          withCredentials: true,
        });
        if (response.data.auth)
          dispatch({ type: LOGIN, payload: response.data });
        else dispatch({ type: LOGOUT });
      } catch (error) {
        console.error(error);
      }
    }
    authResponse();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/view">
          <View />
        </Route>
        <Route path="/add">{user.user_id > -1 ? <Add /> : <NotLogin />}</Route>
        <Route path="/edit">
          {user.user_id > -1 ? <Edit /> : <NotLogin />}
        </Route>
        <Route path="/delete">
          {user.user_id > -1 ? <Delete /> : <NotLogin />}
        </Route>
        <Route>
          <div className="container">Not Found</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
