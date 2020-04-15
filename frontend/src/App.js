import React, { useState, useEffect, useContext } from "react";
import Login from "./components/Login";
import axios from "axios";
import HomePage from "./components/HomePage";
import Modal from "./components/Modal";
import { ModalContext } from "./components/ModalContext";
import NewUser from "./components/NewUser";
import appStyles from "./App.module.css";
function App() {
  const [newUser, setNewUser] = useState(false);
  const [isAuthenticated, setAuthentication] = useState(false);
  const modalContext = useContext(ModalContext);
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
        } else {
          modalContext.changeText(
            "Incorrect credentials, Please check your credentials and try again"
          );
          modalContext.openModal();
        }
      })
      .catch((err) => console.log(err));
  }
  function handleNewUser(
    adminUsername,
    adminPassword,
    userUsername,
    userPassword
  ) {
    axios
      .post("/create-user", {
        adminUsername,
        adminPassword,
        userUsername,
        userPassword,
      })
      .then((response) => {
        const { userCreated } = response.data;
        console.log(userCreated);
        if (userCreated === true) {
          modalContext.changeText("New User successfully registered");
          modalContext.openModal();
          setNewUser(false);
        } else {
          modalContext.changeText(
            "Incorrect Admin credentials. Please check your credentials and try again"
          );
          modalContext.openModal();
        }
      })
      .catch((err) => {
        console.log(err);
        setNewUser(false);
      });
  }
  function createNewUser() {
    modalContext.closeModal();
    setNewUser(true);
  }

  return (
    <div className={appStyles.appDiv}>
      {modalContext.showModal && <Modal />}
      {isAuthenticated ? (
        <HomePage />
      ) : newUser ? (
        <NewUser handleNewUser={handleNewUser} />
      ) : (
        <Login handleAuth={handleAuth} createNewUser={createNewUser} />
      )}
    </div>
  );
}

export default App;
