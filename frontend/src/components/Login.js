import React, { useState } from "react";
import loginStyles from "./Login.module.css";
import logo from "../assets/raspberry-pi.png";
function Login(props) {
  const [detail, setDetail] = useState({ username: "", password: "" });
  const onChange = (e) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = detail;
    props.handleAuth(username, password);
  };
  return (
    <div className={loginStyles.loginDiv}>
      <img src={logo} alt="Raspberry Pi" className={loginStyles.logoImage} />
      <h1 className={loginStyles.title}>RasPi Cloud</h1>
      <form onSubmit={onSubmit}>
        <input
          placeholder="Username"
          className={loginStyles.loginInputText}
          type="text"
          onChange={onChange}
          value={detail.username}
          id="username"
          name="username"
        />
        <input
          placeholder="Password"
          className={loginStyles.loginInputText}
          type="password"
          onChange={onChange}
          value={detail.password}
          id="password"
          name="password"
        />
        <input
          className={loginStyles.loginInputSubmit}
          type="submit"
          value="Authenticate"
        />
      </form>
      <input
        className={loginStyles.loginInputButton}
        type="button"
        onClick={props.createNewUser}
        value="Create New User"
      />
    </div>
  );
}
export default Login;
