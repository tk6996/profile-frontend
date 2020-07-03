import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import { useDispatch } from "react-redux";
import { activeFlash } from "./Flash";
import { ERROR } from "../actions/flash.action";

export default function View() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});
  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      mounted && setLoading(true);
      try {
        let result = await axios.get(
          "http://localhost:7000/api/view" + location.search
        );
        if (result.data.find && mounted) setProfile(result.data);
        else {
          activeFlash(dispatch, ERROR, "Could not load profile");
          history.push("/");
        }
      } catch (error) {
        console.error(error);
      }
      mounted && setLoading(false);
    };
    fetchData();
    return () => {
      mounted = false;
    };
  }, [location, history, dispatch]);

  return (
    <div className="container">
      <h1>Profile information</h1>
      <p>First Name: {profile && profile.first_name}</p>
      <p>Last Name: {profile && profile.last_name}</p>
      <p>Email: {profile && profile.email}</p>
      <p>
        Headline:
        <br /> {profile && profile.headline}
      </p>
      <p>
        Summary:
        <br /> {profile && profile.summary}
      </p>
      {profile && profile.education && profile.education.length > 0 && (
        <>
          Education
          <ul>
            {profile.education.map((value, index) => (
              <li key={index}>
                {value.year}: {value.name}
              </li>
            ))}
          </ul>
        </>
      )}
      {profile && profile.position && profile.position.length > 0 && (
        <>
          Position
          <ul>
            {profile.position.map((value, index) => (
              <li key={index}>
                {value.year}: {value.description}
              </li>
            ))}
          </ul>
        </>
      )}
      <Link to="/">Done</Link>
      {loading && <Loading />}
    </div>
  );
}
