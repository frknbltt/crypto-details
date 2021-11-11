import React, { useEffect, useState } from "react";
import coinGecko from "../apis/coinGecko";
import HistoryChart from "./dashboard/HistoryChart";

const Dashboard = () => {
  const [coinData, setCoinData] = useState({});
  const formatData = (data) => {
    return data.map((el) => {
      return {
        t: el[0],
        y: el[1].toFixed(2),
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const [day, week, year, detail] = await Promise.all([
        coinGecko.get(`/coins/${"bitcoin"}/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "1",
          },
        }),
        coinGecko.get(`/coins/${"bitcoin"}/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "7",
          },
        }),
        coinGecko.get(`/coins/${"bitcoin"}/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "365",
          },
        }),
        coinGecko.get("/coins/markets/", {
          params: {
            vs_currency: "usd",
            ids: "bitcoin",
          },
        }),
      ]);

      setCoinData({
        day: formatData(day.data.prices),
        week: formatData(week.data.prices),
        year: formatData(year.data.prices),
        detail: detail.data[0],
      });
    };
    fetchData();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <h4 style={{ fontSize: "20px", color: "#707070" }}>Dashboard</h4>
      <HistoryChart data={coinData} />
    </div>
  );
};
export default Dashboard;
