import React, { useEffect, useRef } from "react";

import * as d3 from "d3";

const LineChart = ({ title, data }) => {
  const svgEl = useRef(null);

  useEffect(() => {
    if (!svgEl) return;
    drawChartOn(svgEl.current, data);
  }, [svgEl, data]);

  return (
    <div className="line-chart">
      <h3>{title}</h3>
      <svg className="chart" ref={svgEl}></svg>
    </div>
  );
};

function drawChartOn(svgEl, data) {
  setTimeout(() => {
    const svgWidth = svgEl.width.animVal.value;
    const svgHeight = svgEl.height.animVal.value;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const chartGroup = d3
      .select(svgEl)
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
      .attr("class", "xaxis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));

    chartGroup
      .append("g")
      .attr("class", "yaxis")
      .call(d3.axisLeft(yScale));

    chartGroup
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "var(--primary)")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  }, 0);
}

export default LineChart;
