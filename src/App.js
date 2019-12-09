import React, { useState } from "react";

import withBitcoinData from "./core/withBitcoinData";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";

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
    <div className="app">
      <LineChart title="Line Chart" data={bitcoinData}></LineChart>
      <PieChart title="Pie Chart" data={{ a: 9, b: 20, c: 30 }}></PieChart>
    </div>
  );
};

export default App;
