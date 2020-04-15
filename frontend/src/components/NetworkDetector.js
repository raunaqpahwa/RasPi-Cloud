import React, { useEffect, useContext, Fragment } from "react";
import { ModalContext } from "./ModalContext";
const NetworkDetector = (props) => {
  const modalContext = useContext(ModalContext);
  useEffect(() => {
    window.addEventListener("online", handleConnectionChange);
    window.addEventListener("offline", handleConnectionChange);
    return () => {
      window.removeEventListener("online", handleConnectionChange);
      window.removeEventListener("offline", handleConnectionChange);
    };
  });
  function handleConnectionChange() {
    const condition = navigator.onLine ? "online" : "offline";
    if (condition === "online") {
      modalContext.closeModal();
    } else {
      modalContext.changeText(
        "Please check your network connection and try again"
      );
      modalContext.openModal();
    }
  }
  return <Fragment>{props.children}</Fragment>;
};

export default NetworkDetector;
