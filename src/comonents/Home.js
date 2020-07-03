import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { LOGOUT } from "../actions/user.action";
import Table from "./Table";
import Flash, { clearFlash } from "./Flash";

const Home = () => {
  const user = useSelector(({ UserReducer }) => UserReducer);
  const dispatch = useDispatch();
  const [profileList, setProfileList] = useState([]);
  const logout = (event) => {
    event.preventDefault();
    axios.get("http://localhost:7000/api/logout", { withCredentials: true });
    dispatch({ type: LOGOUT });
  };
  const fetchAllProfile = async () => {
    try {
      let res = await axios.get("http://localhost:7000/api/profile_list", {
        withCredentials: true,
      });
      //console.log(res.data);
      setProfileList(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllProfile();
    return () => {
      clearFlash(dispatch);
    };
  }, [dispatch]);

  useEffect(() => {
    let timeout = setTimeout(fetchAllProfile, 10000);
    return () => {
      clearTimeout(timeout);
    };
  }, [profileList]);

  return (
    <div className="container">
      <h1>Watcharin Kanha Resume Register</h1>
      <Flash />
      {user.user_id > -1 ? (
        <p>
          <a href="/" onClick={logout}>
            Logout
          </a>
        </p>
      ) : (
        <p>
          <Link to="/login">Please log in</Link>
        </p>
      )}
      {profileList.length > 0 && <Table data={profileList} />}
      {user.user_id > -1 && (
        <p>
          <Link to="/add">Add New Entry</Link>
        </p>
      )}
    </div>
  );
};

export default Home;
