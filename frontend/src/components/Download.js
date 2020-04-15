import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import download from "../assets/download.png";
import ListItem from "./ListItem";
import { ModalContext } from "./ModalContext";
import downloadStyles from "./Download.module.css";
function Download(props) {
  const [files, setFiles] = useState([]);
  const modalContext = useContext(ModalContext);
  useEffect(() => {
    axios
      .get("/list")
      .then((newFiles) => {
        setFiles(newFiles.data);
      })
      .catch((err) => console.log(err));
    const intervalId = setInterval(() => {
      axios
        .get("/list")
        .then((newFiles) => {
          setFiles(newFiles.data);
        })
        .catch((err) => console.log(err));
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function removeFile(removedFile) {
    const newFiles = files.filter(
      (file) =>
        file.filename !== removedFile.filename && file.size !== removedFile.size
    );
    axios
      .post("/remove-file", removedFile)
      .then(() => {
        setFiles(newFiles);
        modalContext.changeText("Successfully deleted file");
        modalContext.openModal();
        props.handleSpaceChange();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={downloadStyles.downloadDiv}>
      <img
        src={download}
        alt="Download"
        className={downloadStyles.downloadIcon}
      />
      <ul className={downloadStyles.downloadList}>
        {files.map((file, index) => {
          return (
            <ListItem
              key={index}
              name={file.filename}
              size={file.size}
              removeFile={removeFile}
            />
          );
        })}
      </ul>
      <p className={downloadStyles.paragraph}>Tap to download files</p>
    </div>
  );
}

export default Download;
