import React from "react";
import Upload from "./Upload";
import Download from "./Download";
import homePageStyles from "./HomePage.module.css";
function HomePage() {
  return (
    <div className={homePageStyles.homePageDiv}>
      <Upload />
      <Download />
    </div>
  );
}
export default HomePage;
