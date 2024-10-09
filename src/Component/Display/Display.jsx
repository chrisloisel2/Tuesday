import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetBoards } from "../../Redux/BoardReducer";
import BoardList from "../BoardList/BoardList";
import Board from "../Board/Board";
import { Link } from "react-router-dom";
import BoardTable from "../Board/BoardTable/BoardTable";
import Tables from "../Tables/Tables";
import "./Display.css";
import Calendrier from "../Calendar/Calendar";

const Display = () => {
  const dispatch = useDispatch();
  const [board, setBoard] = useState(null);
  const [viewMode, setViewMode] = useState("table");

  useEffect(() => {
    dispatch(GetBoards());
  }, []);

  const selectBoard = (board) => {
    setBoard(board);
  };

  const handleViewChange = (view) => {
    setViewMode(view);
  };

  return (
    <div className="app">
      <BoardList selectBoard={selectBoard} />
      <div className="tables">
        <div className="view-switcher">
          <button onClick={() => handleViewChange("calendar")}>Calendar</button>
          <button onClick={() => handleViewChange("tables")}>Tables</button>
        </div>
        <div className="content">
          {viewMode === "tables" ? <Tables /> : <Calendrier />}
        </div>
      </div>
      {/* <Board board={board} /> */}
    </div>
  );
};

export default Display;
