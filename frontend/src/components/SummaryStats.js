import React from "react";

const SummaryStats = ({ summary }) => {
  const formatNumber = (num) => {
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const stats = [
    {
      label: "Date Range",
      value: `${summary.date_from} to ${summary.date_to}`,
      unit: "",
    },
    { label: "Total Days", value: summary.total_days, unit: "" },
    { label: "Avg Price", value: formatNumber(summary.avg_price), unit: "USD" },
    { label: "Min Price", value: formatNumber(summary.min_price), unit: "USD" },
    { label: "Max Price", value: formatNumber(summary.max_price), unit: "USD" },
    { label: "Volatility", value: formatNumber(summary.volatility), unit: "%" },
  ];

  return (
    <>
      {stats.map((stat, index) => (
        <div key={index} className="summary-card">
          <h3>{stat.label}</h3>
          <div className="value">
            {stat.value}
            {stat.unit && <span className="unit">{stat.unit}</span>}
          </div>
        </div>
      ))}
    </>
  );
};

export default SummaryStats;
