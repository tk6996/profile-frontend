import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loading from "./Loading";
import axios from "axios";
import Flash, { activeFlash, clearFlash } from "./Flash";
import { ERROR, SUCCESS } from "../actions/flash.action";

import "../Styles.css";

export default function Delete() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [found, setFound] = useState(false);
  const [finish, setFinish] = useState(false);

  const deleteProfile = async () => {
    setLoading(true);
    await axios.delete("http://localhost:7000/api/delete" + location.search, {
      withCredentials: true,
    });
    setLoading(false);
    setFinish(true);
  };

  useEffect(() => {
    let mounted = true;
    if (!found) {
      setLoading(true);
      axios
        .get("http://localhost:7000/api/delete" + location.search, {
          withCredentials: true,
        })
        .then((result) => {
          if (result.data.find) {
            //console.log(result.data);
            setFound(true);
            if (mounted) {
              const data = result.data;
              setFirstName(data.first_name);
              setLastName(data.last_name);
            }
          } else {
            mounted && setFinish(true);
          }
          mounted && setLoading(false);
        });
    }
    if (finish) history.push("/");
    return () => {
      mounted = false;
      setLoading(false);
      if (finish)
        if (found) activeFlash(dispatch, SUCCESS, "Profile delete");
        else activeFlash(dispatch, ERROR, "Could not load profile");
      else clearFlash(dispatch);
    };
  }, [dispatch, finish, history, location, found]);

  return (
    <div className="container">
      <h1>Deleteing Profile</h1>
      <Flash />
      <p>First Name: {firstName}</p>
      <p>Last Name: {lastName}</p>
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="form-button">
          <input type="submit" value="Login" onClick={deleteProfile} />
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
