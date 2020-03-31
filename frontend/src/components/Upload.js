import React, { useState } from "react";
import ListItemUpload from "./ListItemUpload.js";
import axios from "axios";
import uploadStyles from "./Upload.module.css";
import download from "../assets/upload.png";
function Upload() {
  const [fileList, setFileList] = useState([]);
  const [percent, setPercent] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  function onChange(e) {
    const newFileList = [...e.target.files, ...fileList];
    setFileList(newFileList);
  }

  function onSubmit(e) {
    e.preventDefault();
    setIsUploading(true);
    const formData = new FormData();
    for (let file of fileList) {
      formData.append("files", file);
    }
    const options = {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress: progressEvent => {
        const { loaded, total } = progressEvent;
        let percentComplete = parseInt((loaded * 100) / total);
        setPercent(percentComplete);
      }
    };

    axios
      .post("/upload-files", formData, options)
      .then(res => {
        setFileList([]);
        setIsUploading(false);
        setPercent(0);
      })
      .catch(err => {
        setIsUploading(false);
        setPercent(0);
        console.log(err);
      });
  }

  function removeItem(file) {
    const newFiles = fileList.filter(
      existingFile => existingFile.name !== file
    );
    setFileList(newFiles);
  }

  return (
    <div className={uploadStyles.uploadDiv}>
      {isUploading ? (
        <div className={uploadStyles.uploadContainer}>
          <p className={uploadStyles.uploadPercent}>{percent}%</p>
          <div
            className={uploadStyles.uploadBar}
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      ) : (
        <img
          className={uploadStyles.downloadIcon}
          src={download}
          alt="Download Icon"
        />
      )}

      <form
        className={uploadStyles.uploadForm}
        onSubmit={onSubmit}
        encType="multipart/form-data"
      >
        <input
          className={uploadStyles.hideInput}
          type="file"
          id="files"
          name="files"
          onChange={onChange}
          multiple
        />
        <label className={uploadStyles.selectButton} htmlFor="files">
          Select files
        </label>
        <ul className={uploadStyles.uploadList}>
          {fileList.map((file, index) => (
            <ListItemUpload
              key={index}
              name={file.name}
              removeItem={removeItem}
            />
          ))}
        </ul>
        <input
          className={uploadStyles.inputButton}
          type="submit"
          value="Upload"
        />
      </form>
    </div>
  );
}
export default Upload;
