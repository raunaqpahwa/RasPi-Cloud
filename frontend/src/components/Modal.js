import React, { useContext } from "react";
import { ModalContext } from "./ModalContext";
import modalStyles from "./Modal.module.css";
const Modal = () => {
  const modalContext = useContext(ModalContext);
  return (
    <div className={modalStyles.modalContainer}>
      <p className={modalStyles.modalParagraph}>{modalContext.text}</p>
      <input
        className={modalStyles.modalButton}
        type="button"
        onClick={modalContext.closeModal}
        value="Close"
      />
    </div>
  );
};

export default Modal;
