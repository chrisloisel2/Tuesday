import React, { useEffect, useState } from "react";
import BoardList from "../BoardList/BoardList";
import "./Display.css";
import Board from "../Boards/Board";
import { GetBoards } from "../../Redux/BoardReducer";
import { useDispatch } from "react-redux";

const Display = () => {
  const [activeBoard, setActiveBoard] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetBoards());
  }, []);

  return (
    <div className="display-container">
      <BoardList setActiveBoard={setActiveBoard} />{" "}
      <div className="board-content">
        <Board activeBoard={activeBoard} />
      </div>
      <style jsx>{`
        .display-container {
          display: flex;
          height: 100vh;
        }

        .board-content {
          flex-grow: 1;
          padding: 20px;
          width: 80vw;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
};

export default Display;
