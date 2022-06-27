import { useSelector } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";

const Users = () => {

  const loggedIn = useSelector((state) => state.login)
  const users = useSelector((state) => state.users);

  if (loggedIn === null) {
    return (
      <div>
        <p>you must be logged in</p>
      </div>
    )
  }
  const tableStyle = {
    margin: "auto",
    width: "50%",
    border: "3px solid green",
    padding: "10px"
  }
  const headerStyle= {
    margin: "auto",
    width: "50%",
    padding: "10px"
  }
  return (
    <div>
      <h2 style={headerStyle}>Users</h2>
      <table style={tableStyle}>
        <tbody>
        <tr>
          <td></td>
          <td>
            <strong>blogs created</strong>
          </td>
        </tr>
        {users.map((u,i) => (
          <tr key={`${i}-${u.id}`}>
            <td key={i}>
              <Link to={`/users/${u.id}`} key={i}>
                {u.name}
              </Link>
            </td>
            <td key={`${i}+${u.id}`}>{u.blogs.length}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
