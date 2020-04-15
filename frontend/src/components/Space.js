import React from "react";
import spaceStyles from "./Space.module.css";

const Space = (props) => {
  function bytesToSize(bytes) {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 Byte";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
  }
  return (
    <div className={spaceStyles.spaceContainer}>
      <p className={spaceStyles.paragraph}>
        Available: {bytesToSize(props.total - props.used)}
      </p>
      <p className={spaceStyles.paragraph}>Used: {bytesToSize(props.used)}</p>
      <p className={spaceStyles.paragraph}>Total: {bytesToSize(props.total)}</p>
    </div>
  );
};
export default Space;
