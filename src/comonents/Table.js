import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../Styles.css";

export default function Table({ data }) {
  const user = useSelector(({ UserReducer }) => UserReducer);
  return (
    <div>
      <table className="table-profile">
        <thead>
          <tr>
            <th>Name</th>
            <th>Headline</th>
            {user.user_id > -1 && <th colSpan={2}>Action</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((value, index) => (
            <tr key={index}>
              <td>
                <Link to={`/view?profile_id=${value.profile_id}`}>
                  {value.first_name} {value.last_name}
                </Link>
              </td>
              <td>{value.headline}</td>

              {user.user_id > -1 &&
                (user.user_id === value.user_id ? (
                  <>
                    <td style={{ width: "50px", textAlign: "center" }}>
                      <Link to={`/edit?profile_id=${value.profile_id}`}>
                        Edit
                      </Link>
                    </td>
                    <td style={{ width: "50px", textAlign: "center" }}>
                      <Link to={`/delete?profile_id=${value.profile_id}`}>
                        Delete
                      </Link>
                    </td>
                  </>
                ) : (
                  <td style={{ width: "100px" }} colSpan={2}></td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
