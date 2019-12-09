import React, { useEffect, useRef } from "react";

import * as d3 from "d3";

const PieChart = ({ title, data }) => {
  const svgEl = useRef(null);

  useEffect(() => {
    if (!svgEl) return;
    drawChartOn(svgEl.current, data);
  }, [svgEl, data]);

  return (
    <div className="pie-chart">
      <h3>{title}</h3>
      <svg className="chart" ref={svgEl}></svg>
    </div>
  );
};

function drawChartOn(svgEl, data) {
  const svgWidth = 800;
  const svgHeight = 600;
  const margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 50
  };
  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;
  const radius = Math.min(width, height) / 2;

  const chartGroup = d3
    .select(svgEl)
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  const colors = d3.scaleOrdinal().range(["#4682b4", "#6046b4", "#46b477"]);

  const pie = d3.pie();
  const pieData = pie(Object.values(data));

  const arc = d3
    .arc()
    .innerRadius(0)
    .outerRadius(radius);

  // arcs
  chartGroup
    .selectAll("arc")
    .data(pieData)
    .enter()
    .append("g")
    .attr("class", "arc")
    .append("path")
    .attr("fill", function(d) {
      return colors(d.index);
    })
    .attr("d", arc);
}

export default PieChart;
