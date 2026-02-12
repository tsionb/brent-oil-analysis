import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const PriceChart = ({ data, events, highlightedEvent, dateRange }) => {
  // Combine price data with events
  const chartData = data.dates.map((date, index) => ({
    date,
    price: data.prices[index],
    logReturn: data.log_returns?.[index],
  }));

  // Get events within date range
  const filteredEvents = events.filter(
    (event) => event.date >= dateRange.start && event.date <= dateRange.end,
  );

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: "white",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <p style={{ margin: 0, fontWeight: "bold" }}>{label}</p>
          <p style={{ margin: 0, color: "#8884d8" }}>
            Price: ${payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickFormatter={(date) => date.substring(0, 7)} // Show YYYY-MM
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />

          {/* Price line */}
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
            name="Brent Oil Price"
          />

          {/* Event reference lines */}
          {filteredEvents.map((event, index) => (
            <ReferenceLine
              key={index}
              x={event.date}
              stroke={
                highlightedEvent?.date === event.date ? "#ff6b6b" : "#82ca9d"
              }
              strokeDasharray="3 3"
              strokeWidth={highlightedEvent?.date === event.date ? 3 : 1}
              label={{
                value: event.name,
                position: "top",
                fill:
                  highlightedEvent?.date === event.date ? "#ff6b6b" : "#666",
                fontSize: 10,
              }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;
