import React, { useState } from "react";

import withBitcoinData from "./core/withBitcoinData";
import LineChart from "./components/LineChart";

import "./App.css";

const today = new Date();

const tenDaysAgo = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 10
);

const App = () => {
  const [start] = useState(tenDaysAgo);
  const [end] = useState(today);
  const [loading, bitcoinData] = withBitcoinData(start, end);

  if (loading) {
    return <span>Loading...</span>;
  }

  return (
    <div className="App">
      <LineChart data={bitcoinData}></LineChart>
    </div>
  );
};

export default App;
