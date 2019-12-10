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
      <h1 className="title">D3 Study</h1>
      <div className="dashboard">
        <div className="card">
          <LineChart title="Line Chart" data={bitcoinData}></LineChart>
        </div>
        <div className="card">
          <PieChart title="Pie Chart" data={{ a: 9, b: 20, c: 30 }}></PieChart>
        </div>
      </div>
    </div>
  );
};

export default App;
