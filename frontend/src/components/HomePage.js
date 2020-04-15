import React, { useState, useEffect } from "react";
import Upload from "./Upload";
import Download from "./Download";
import Space from "./Space";
import homePageStyles from "./HomePage.module.css";
import axios from "axios";
function HomePage() {
  const [available, setAvailable] = useState(0);
  const [used, setUsed] = useState(0);
  const [total, setTotal] = useState(0);
  function handleSpaceChange() {
    axios
      .get("/free-space")
      .then((response) => {
        setAvailable(response.data.available);
        setUsed(response.data.used);
        setTotal(response.data.total);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    handleSpaceChange();
  });
  return (
    <div className={homePageStyles.homePageDiv}>
      <Upload handleSpaceChange={handleSpaceChange} />
      <Space available={available} used={used} total={total} />
      <Download handleSpaceChange={handleSpaceChange} />
    </div>
  );
}
export default HomePage;
