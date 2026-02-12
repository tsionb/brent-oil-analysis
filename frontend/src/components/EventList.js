import React from "react";

const EventList = ({ events, onHighlight, highlightedEvent }) => {
  return (
    <div className="events-list">
      {events.length === 0 ? (
        <p className="loading">No events found</p>
      ) : (
        events.map((event, index) => (
          <div
            key={index}
            className={`event-item ${highlightedEvent?.date === event.date ? "highlighted" : ""}`}
            onClick={() => onHighlight(event)}
            onMouseEnter={() => onHighlight(event)}
            onMouseLeave={() => onHighlight(null)}
          >
            <div className="event-date">{event.date}</div>
            <div className="event-name">{event.name}</div>
            <div className="event-description">{event.description}</div>
            <span className="event-impact">{event.impact_type}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default EventList;
