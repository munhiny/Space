import { useState, useEffect } from "react";
import logo from "./logo.svg";
import axios from "axios";
import "./App.css";

const apiUrl = "http://localhost:5000/users/";

function App() {
  // this will be an empty array, expecting a json object
  const [userData, setUserData] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  let name, email;

  //on page load fetch from api
  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    userDetails && postUserData();
  }, [userDetails]);

  const postUserData = async () => {
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    try {
      const response = await fetch(apiUrl, settings);
      const data = await response.json();
      return data;
    } catch (e) {
      return e;
    }
  };

  const getUserData = async () => {
    const response = await fetch(apiUrl);
    const jsonData = await response.json();
    setUserData(jsonData);
  };

  const handleNameChange = (event) => {
    name = event.target.value;
    console.log(name);
  };

  const handleEmailChange = (event) => {
    email = event.target.value;
    console.log(email);
  };

  const handleSubmit = (event) => {
    const details = {
      name: name,
      email: email,
    };

    setUserDetails(details);

    event.preventDefault();
  };

  console.log("userData", userData);
  console.log("UserDetail", userDetails);

  const renderData = () =>
    userData.map((user, key) => {
      return <ul key={key}>{user.name}</ul>;
    });
  console.log("name: ", name);
  console.log("email: ", email);
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <li>{userData.length > 0 && renderData()}</li>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <label>name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleNameChange}
            />
            <label>email:</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleEmailChange}
            />
            <input type="submit" name="submit" />
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
