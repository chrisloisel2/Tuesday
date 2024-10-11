import React, { useEffect, useState } from "react";
import BoardList from "../BoardList/BoardList";
import "./Display.css";

const Display = () => {
  const [activeBoard, setActiveBoard] = useState("formations");

  return (
    <div className="display-container">
      <BoardList setActiveBoard={setActiveBoard} />{" "}
      <div className="board-content"></div>
      <style jsx>{`
        .display-container {
          display: flex;
          height: 100vh;
        }

        .board-content {
          flex-grow: 1;
          padding: 20px;
          width: 80vw;
        }
      `}</style>
    </div>
  );
};

export default Display;
