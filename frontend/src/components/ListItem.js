import React from "react";
import listItemStyles from "./ListItem.module.css";
function ListItem({ name, size, removeFile }) {
  return (
    <div className={listItemStyles.item}>
      <a className={listItemStyles.anchor} href={`/storage/${name}`} download>
        {name} | {(size / 1000000).toFixed(2)} MB
      </a>

      <button
        className={listItemStyles.removeButtonStyle}
        onClick={() => removeFile({ filename: name, size })}
      >
        X
      </button>
    </div>
  );
}
export default ListItem;
