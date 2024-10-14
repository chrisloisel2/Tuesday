import React from "react";
import "./Calendar.css";

const CustomToolbar = ({ onNavigate, onView, label, view }) => {
  const goToBack = () => {
    onNavigate("PREV");
  };

  const goToNext = () => {
    onNavigate("NEXT");
  };

  const goToCurrent = () => {
    onNavigate("TODAY");
  };

  const setView = (viewName) => {
    onView(viewName);
  };

  return (
    <div className="custom-toolbar">
      <button className="today-btn" onClick={goToCurrent}>
        Aujourd'hui
      </button>
      <div className="nav-buttons">
        <button className="left-btn" onClick={goToBack}>
          {"<"}
        </button>
        <span className="toolbar-label">{label}</span>
        <button className="right-btn" onClick={goToNext}>
          {">"}
        </button>
      </div>
      <div className="view-buttons">
        <button
          className={view === "month" ? "active" : ""}
          onClick={() => setView("month")}
        >
          Mensuel
        </button>
        <button
          className={view === "week" ? "active" : ""}
          onClick={() => setView("week")}
        >
          Hebdomadaire
        </button>
        <button
          className={view === "day" ? "active" : ""}
          onClick={() => setView("day")}
        >
          Quotidienne
        </button>
        <button
          className={view === "agenda" ? "active" : ""}
          onClick={() => setView("agenda")}
        >
          Agenda
        </button>
      </div>
    </div>
  );
};

export default CustomToolbar;
