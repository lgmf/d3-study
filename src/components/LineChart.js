import React, { useEffect } from "react";

import * as d3 from "d3";

const LineChart = ({ title, data }) => {
  useEffect(() => {
    drawChart(data);
  });

  return (
    <React.Fragment>
      <h3>{title}</h3>
      <svg></svg>
    </React.Fragment>
  );
};

function drawChart(data) {
  const svgWidth = 800;
  const svgHeight = 600;
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  const svg = d3
    .select("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  const chartGroup = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const xScale = d3.scaleTime().rangeRound([0, width]);

  const yScale = d3.scaleLinear().rangeRound([height, 0]);

  const line = d3
    .line()
    .x(function(d) {
      return xScale(d.date);
    })
    .y(function(d) {
      return yScale(d.value);
    });

  xScale.domain(
    d3.extent(data, function(d) {
      return d.date;
    })
  );

  yScale.domain(
    d3.extent(data, function(d) {
      return d.value;
    })
  );

  chartGroup
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));

  chartGroup
    .append("g")
    .call(d3.axisLeft(yScale))
    .append("text")
    .attr("fill", "#000")
    .attr("y", -5)
    .style("font-weight", "bold")
    .text("Price ($)");

  chartGroup
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line);
}

export default LineChart;
