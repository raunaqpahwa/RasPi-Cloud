import React, { useState, createContext } from "react";

const ModalContext = createContext({});

const ModalContextProvider = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  function closeModal() {
    setShowModal(false);
  }
  function openModal() {
    setShowModal(true);
  }
  function changeText(msg) {
    setText(msg);
  }
  return (
    <ModalContext.Provider
      value={{ showModal, openModal, closeModal, changeText, text }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalContextProvider };
