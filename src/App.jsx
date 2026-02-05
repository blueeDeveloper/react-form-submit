import { useState } from "react";
import "./App.css";

function App() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [dataSubmitted, setDataSubmitted] = useState(false);

  const [localData, setLocalData] = useState({ user: "", pwd: "" });

  const handleUser = (e) => {
    setDataSubmitted(false);
    setUserName(e.target.value);
  };

  const handlePassword = (e) => {
    setDataSubmitted(false);
    localStorage.removeItem("userData")
     localStorage.removeItem("password")
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName === "" || password === "") return;
    setDataSubmitted(true);
    let formData = {
      user: userName,
      pwd: password,
    };
    console.log(formData);
    localStorage.setItem("userData", JSON.stringify(formData.user));
    localStorage.setItem("password", JSON.stringify(formData.pwd));

    let user = JSON.parse(localStorage.getItem("userData"));
    let pwd = JSON.parse(localStorage.getItem("password"));
    setLocalData({ user: user, pwd: pwd });
  };

  return (
    <div className="page-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <div>
            <label>User Name:</label>
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter user name"
              onChange={(e) => handleUser(e)}
            ></input>
          </div>
        </div>
        <div className="form-group">
          <div>
            <label>Password:</label>
          </div>
          <div>
            <input
              type="password"
              placeholder="Enter password"
              onChange={(e) => handlePassword(e)}
            ></input>
          </div>
        </div>
        <div className="form-btn">
          <button
            className="save-btn"
            type="submit"
            disabled={userName === "" || password === ""}
          >
            Save User
          </button>
          {dataSubmitted && (
            <>
              <div>{"Credentials entered by User:"} </div>
              <div>{"User Name: " + localData?.user}</div>
              <div>{"Password: " + localData?.pwd}</div>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default App;
