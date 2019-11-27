import React, { useState } from "react";

import withBitcoinData from "./core/withBitcoinData";
import LineChart from "./components/LineChart";

import "./App.css";

const _today = new Date();

const _tenDaysAgo = new Date(
  _today.getFullYear(),
  _today.getMonth(),
  _today.getDate() - 10
);

export default function() {
  const [start] = useState(_tenDaysAgo);
  const [end] = useState(_today);
  const [loading, bitcoinData] = withBitcoinData(start, end);

  if (loading) {
    return <span>Loading...</span>;
  }

  return (
    <div className="App">
      <LineChart data={bitcoinData}></LineChart>
    </div>
  );
}
