import React, { useState } from "react";

const DateFilter = ({ dateRange, onDateChange, minDate, maxDate }) => {
  const [startDate, setStartDate] = useState(dateRange.start);
  const [endDate, setEndDate] = useState(dateRange.end);

  const handleStartChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleApply = () => {
    onDateChange({ start: startDate, end: endDate });
  };

  const handleReset = () => {
    setStartDate(minDate);
    setEndDate(maxDate);
    onDateChange({ start: minDate, end: maxDate });
  };

  return (
    <div className="date-picker-container">
      <div className="date-input">
        <label>From:</label>
        <input
          type="date"
          value={startDate}
          min={minDate}
          max={endDate}
          onChange={handleStartChange}
        />
      </div>

      <div className="date-input">
        <label>To:</label>
        <input
          type="date"
          value={endDate}
          min={startDate}
          max={maxDate}
          onChange={handleEndChange}
        />
      </div>

      <button
        onClick={handleApply}
        style={{
          padding: "10px 20px",
          background: "#667eea",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "1em",
        }}
      >
        Apply Filter
      </button>

      <button
        onClick={handleReset}
        style={{
          padding: "10px 20px",
          background: "#6c757d",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "1em",
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default DateFilter;
