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
  setTimeout(() => {
    const svgWidth = svgEl.width.animVal.value;
    const svgHeight = svgEl.height.animVal.value;

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
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const colors = d3
      .scaleOrdinal()
      .range(["var(--primary)", "var(--secondary)", "var(--tertiary)"]);

    const pie = d3.pie();
    const pieData = pie(Object.values(data));

    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius);

    const label = d3
      .arc()
      .outerRadius(radius)
      .innerRadius(radius - 80);

    const arcs = chartGroup
      .selectAll("arc")
      .data(pieData)
      .enter()
      .append("g")
      .attr("class", "arc");

    // create the pies
    arcs
      .append("path")
      .attr("fill", function(d) {
        return colors(d.index);
      })
      .attr("d", arc);

    arcs
      .append("text")
      .attr("transform", function(d) {
        return "translate(" + label.centroid(d) + ")";
      })
      .text(function(d) {
        const keys = Object.keys(data);
        return keys[d.index];
      })
      .attr("fill", "#fff");
  }, 0);
}

export default PieChart;
