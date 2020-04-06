import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import axios from "axios";
import HomePage from "./components/HomePage";
import appStyles from "./App.module.css";
function App() {
  const [isAuthenticated, setAuthentication] = useState(false);
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("authenticated");
    setAuthentication(isAuthenticated);
  }, []);
  function handleAuth(username, password) {
    axios
      .post("/authenticate", { username, password })
      .then((response) => {
        const { authenticated } = response.data;
        if (authenticated) {
          setAuthentication(true);
          sessionStorage.setItem("authenticated", "true");
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className={appStyles.appDiv}>
      {isAuthenticated ? <HomePage /> : <Login handleAuth={handleAuth} />}
    </div>
  );
}

export default App;
