import React, { useEffect, useState } from "react";
import Tables from "../Tables/Tables";
import Calendrier from "../Calendar/Calendar";
// import "./FormationBoard.css";

const FormationBoard = () => {
  const [viewMode, setViewMode] = useState("calendar");

  useEffect(() => {
    setViewMode("tables");
  }, []);

  const handleViewChange = (view) => {
    setViewMode(view);
  };

  return (
    <div className="formation-board">
      <div className="view-switcher">
        <button
          className={viewMode === "tables" ? "active" : ""}
          onClick={() => handleViewChange("tables")}
        >
          Formation
        </button>
        <button
          className={viewMode === "finances" ? "active" : ""}
          onClick={() => handleViewChange("finances")}
        >
          Formation
        </button>
        <button
          className={viewMode === "calendar" ? "active" : ""}
          onClick={() => handleViewChange("calendar")}
        >
          Calendrier
        </button>
      </div>

      <div className="content">
        {viewMode === "tables" && <Tables />}
        {viewMode === "calendar" && <Calendrier />}
      </div>

      <style jsx>{`
        .view-switcher {
          margin-bottom: 20px;
        }
        .view-switcher button {
          margin-right: 10px;
          padding: 10px;
          cursor: pointer;
        }
        .view-switcher button.active {
          background-color: #007bff;
          color: white;
        }
        .content {
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
};

export default FormationBoard;
