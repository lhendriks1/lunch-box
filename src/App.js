import React, { useState, useEffect } from "react";
import Nav from "./@components/Nav";
import LunchForm from "./@components/LunchForm";
import Summary from "./@components/Summary";

import { COSTS, DEFAULT } from "./constants";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeLink, setActiveLink] = useState(0);
  const [lunchBox, setLunchBox] = useState(DEFAULT);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 200);
  }, []);

  useEffect(() => {
    const boxCost = COSTS[lunchBox.box] || 0;
    const total = lunchBox.customize.reduce(
      (acc, option) => (acc += COSTS[option]),
      boxCost
    );

    setTotal(total);
  }, [lunchBox]);

  if (isLoading)
    return (
      <div className='middle'>
        Loading...
      </div>
    );

  return (
    <div className="app">
      <Nav activeLink={activeLink} setActiveLink={setActiveLink} />
      <LunchForm
        lunchBox={lunchBox}
        setLunchBox={setLunchBox}
        activeLink={activeLink}
        setActiveLink={setActiveLink}
        total={total}
      />
      {activeLink !== 2 && <div><Summary lunchBox={lunchBox} total={total} /></div>}
    </div>
  );
}

export default App;
