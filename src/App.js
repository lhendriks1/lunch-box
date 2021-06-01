import React, { useState, useEffect } from "react";
import Nav from "./components/Nav";
import LunchForm from "./components/LunchForm";
import Summary from "./components/Summary";
import "./App.css";
import { COSTS, DEFAULT } from "./constants";

function App() {
  const [activeLink, setActiveLink] = useState(0);
  const [lunchBox, setLunchBox] = useState(DEFAULT);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const boxCost = COSTS[lunchBox.box] || 0;
    const total = lunchBox.customize.reduce(
      (acc, option) => acc += COSTS[option],
      boxCost
    );

    setTotal(total);
  }, [lunchBox]);

  return (
    <div className="app">
      <Nav activeLink={activeLink} setActiveLink={setActiveLink} />
      <LunchForm lunchBox={lunchBox} setLunchBox={setLunchBox} activeLink={activeLink} setActiveLink={setActiveLink} total={total}/>
        { activeLink !== 3 && <Summary lunchBox={lunchBox} total={total} />}
    </div>
  );
}

export default App;
