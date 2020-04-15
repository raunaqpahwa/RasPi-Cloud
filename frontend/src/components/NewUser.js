import React, { useState } from "react";
import loginStyles from "./Login.module.css";
import logo from "../assets/raspberry-pi.png";
function NewUser(props) {
  const [adminDetail, setAdminDetail] = useState({
    adminUsername: "",
    adminPassword: "",
  });
  const [userDetail, setUserDetail] = useState({
    userUsername: "",
    userPassword: "",
  });
  const adminOnChange = (e) => {
    setAdminDetail({ ...adminDetail, [e.target.name]: e.target.value });
  };
  const userOnChange = (e) => {
    setUserDetail({ ...userDetail, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { adminUsername, adminPassword } = adminDetail;
    const { userUsername, userPassword } = userDetail;
    props.handleNewUser(
      adminUsername,
      adminPassword,
      userUsername,
      userPassword
    );
  };
  return (
    <div className={loginStyles.loginDiv}>
      <img src={logo} alt="Raspberry Pi" className={loginStyles.logoImage} />
      <h1 className={loginStyles.title}>RasPi Cloud</h1>
      <form onSubmit={onSubmit}>
        <input
          placeholder="Admin Username"
          className={loginStyles.loginInputText}
          type="text"
          onChange={adminOnChange}
          value={adminDetail.adminUsername}
          id="adminUsername"
          name="adminUsername"
        />
        <input
          placeholder="Admin Password"
          className={loginStyles.loginInputText}
          type="password"
          onChange={adminOnChange}
          value={adminDetail.adminPassword}
          id="adminPassword"
          name="adminPassword"
        />
        <input
          placeholder="New User Username"
          className={loginStyles.loginInputText}
          type="text"
          onChange={userOnChange}
          value={userDetail.userUsername}
          id="userUsername"
          name="userUsername"
        />
        <input
          placeholder="New User Password"
          className={loginStyles.loginInputText}
          type="password"
          onChange={userOnChange}
          value={userDetail.userPassword}
          id="userPassword"
          name="userPassword"
        />
        <input
          className={loginStyles.loginInputSubmit}
          type="submit"
          value="Create New User"
        />
      </form>
    </div>
  );
}
export default NewUser;
