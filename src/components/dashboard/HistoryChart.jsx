import React, { useRef, useEffect, useState } from "react";
import Chartjs from "chart.js";
import { historyOptions } from "../../chartConfigs/chartConfigs";
import Cards from "./Cards";

const HistoryChart = ({ data }) => {
  const chartRef = useRef();
  const { day, week, year, detail } = data;
  const [timeFormat, setTimeFormat] = useState("24h");
  const determineTimeFormat = () => {
    switch (timeFormat) {
      case "24h":
        return day;
      case "7d":
        return week;
      case "1y":
        return year;
      default:
        return day;
    }
  };

  useEffect(() => {
    if (chartRef && chartRef.current && detail) {
      const chartInstance = new Chartjs(chartRef.current, {
        type: "line",
        data: {
          datasets: [
            {
              label: `${detail.name} price`,
              data: determineTimeFormat(),
              backgroundColor: "rgba(174, 305, 194, 0.5)",
              borderColor: "rgba(174, 305, 194, 0.4",
              pointRadius: 0,
            },
          ],
        },
        options: {
          ...historyOptions,
        },
      });
    }
  });
  var time = new Date();
  const renderPrice = () => {
    if (detail) {
      return (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <Cards
              color="#2E5BFF"
              count={"$" + detail.current_price.toFixed(2)}
              caption="Current Avarage Price"
            />
            <Cards
              color="#F7C137"
              count={detail.price_change_percentage_24h.toFixed(2) + "%"}
              caption="Price Change Percent"
            />
            <Cards
              color="#8C54FF"
              count={
                time.getHours() +
                ":" +
                time.getMinutes() +
                ":" +
                time.getSeconds()
              }
              caption="Check Servet Time"
            />
          </div>
          <p
            className={
              detail.price_change_24h < 0
                ? "text-danger my-0"
                : "text-success my-0"
            }
          ></p>
        </>
      );
    }
  };
  return (
    <div>
      <div>{renderPrice()}</div>
      <div
        style={{
          backgroundColor: "white",
          padding: "4% 2% 1% 2%",
          boxShadow: "6px 6px 42px -35px",
        }}
      >
        <canvas ref={chartRef} id="myChart" width={250} height={250}></canvas>
        <div style={{ display: "flex", justifyContent: "center", gap: "5px" }}>
          <button
            style={{
              backgroundColor: "white",
              border: "1px solid black ",
              borderRadius: "5px",
            }}
            onClick={() => setTimeFormat("24h")}
          >
            Day
          </button>
          <button
            style={{
              backgroundColor: "white",
              border: "1px solid black ",
              borderRadius: "5px",
            }}
            onClick={() => setTimeFormat("7d")}
          >
            Week
          </button>
          <button
            style={{
              backgroundColor: "white",
              border: "1px solid black ",
              borderRadius: "5px",
            }}
            style={{
              backgroundColor: "white",
              border: "1px solid black ",
              borderRadius: "5px",
            }}
            onClick={() => setTimeFormat("1y")}
          >
            Year
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryChart;
