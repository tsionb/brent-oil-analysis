import React, { useState, useEffect } from "react";
import axios from "axios";
import PriceChart from "./components/PriceChart";
import EventList from "./components/EventList";
import SummaryStats from "./components/SummaryStats";
import DateFilter from "./components/DateFilter";
import "./App.css";

const API_BASE_URL = "http://localhost:5000/api";

function App() {
  const [priceData, setPriceData] = useState({ dates: [], prices: [] });
  const [events, setEvents] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    start: "1987-05-20",
    end: "2022-11-14",
  });
  const [highlightedEvent, setHighlightedEvent] = useState(null);

  // Fetch data when component loads
  useEffect(() => {
    fetchAllData();
  }, []);

  // Fetch data when date range changes
  useEffect(() => {
    fetchFilteredData();
  }, [dateRange]);

  const fetchAllData = async () => {
    try {
      const [summaryRes, eventsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/summary`),
        axios.get(`${API_BASE_URL}/events`),
      ]);

      setSummary(summaryRes.data.summary);
      setEvents(eventsRes.data.events);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchFilteredData = async () => {
    setLoading(true);
    try {
      const pricesRes = await axios.get(
        `${API_BASE_URL}/prices?format=chart&start=${dateRange.start}&end=${dateRange.end}`,
      );
      setPriceData(pricesRes.data.data);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
    setLoading(false);
  };

  const handleDateChange = (newRange) => {
    setDateRange(newRange);
  };

  const handleEventHighlight = (event) => {
    setHighlightedEvent(event);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1> Brent Oil Price Dashboard</h1>
        <p>
          Analyzing the impact of geopolitical events on oil prices (1987-2022)
        </p>
      </header>

      <div className="dashboard-container">
        {/* Summary Stats Section */}
        <section className="section summary-section">
          <h2> Market Summary</h2>
          {summary && <SummaryStats summary={summary} />}
        </section>

        {/* Date Filter Section */}
        <section className="section filter-section">
          <h2> Date Range</h2>
          <DateFilter
            dateRange={dateRange}
            onDateChange={handleDateChange}
            minDate="1987-05-20"
            maxDate="2022-11-14"
          />
        </section>

        {/* Chart Section */}
        <section className="section chart-section">
          <h2> Price History</h2>
          {loading ? (
            <div className="loading">Loading chart...</div>
          ) : (
            <PriceChart
              data={priceData}
              events={events}
              highlightedEvent={highlightedEvent}
              dateRange={dateRange}
            />
          )}
        </section>

        {/* Events Section */}
        <section className="section events-section">
          <h2> Key Events</h2>
          <EventList
            events={events}
            onHighlight={handleEventHighlight}
            highlightedEvent={highlightedEvent}
          />
        </section>
      </div>
    </div>
  );
}

export default App;
