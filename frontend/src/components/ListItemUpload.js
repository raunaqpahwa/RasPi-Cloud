import React from "react";
import listItemStyles from "./ListItemUpload.module.css";
function ListItemUpload({ name, removeItem }) {
  return (
    <div className={listItemStyles.item}>
      <li>{name}</li>
      <input
        type="button"
        value="X"
        className={listItemStyles.removeButtonStyle}
        onClick={() => removeItem(name)}
      />
    </div>
  );
}

export default ListItemUpload;
