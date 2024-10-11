import React, { useEffect, useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import FormationBoard from "../BoardsPablo/FormationBoard";
import BoardCours from "../BoardsPablo/BoardCours";
import OtherBoard from "../BoardsPablo/OtherBoard";

const BoardList = ({ activeBoard, setActiveBoard }) => {
  const boards = [
    { id: "formations", title: "Formations" },
    { id: "cours", title: "Cours" },
    { id: "autre", title: "Autre" },
  ];

  return (
    <div className="board-list-container">
      <div className="menu">
        {boards.map((board) => (
          <button
            key={board.id}
            className={`board-item ${
              activeBoard === board.id ? "board-item-active" : ""
            }`}
            onClick={() => setActiveBoard(board.id)}
          >
            <IoDocumentTextOutline
              style={{
                fontSize: "20px",
                marginRight: "10px",
              }}
            />
            <p>{board.title}</p>
          </button>
        ))}
        <button
          className="board-item"
          onClick={() => console.log("Ajouter un nouveau board")}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
          }}
        >
          <MdAdd />
        </button>
      </div>

      <div className="board-content">
        {activeBoard === "formations" && <FormationBoard />}
        {activeBoard === "cours" && <BoardCours />}
        {activeBoard === "autre" && <OtherBoard />}
      </div>

      <style jsx>{`
        .board-list-container {
          display: flex;
          height: 100vh;
        }

        .menu {
          width: 200px;
          background-color: #292f4c;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }

        .menu button {
          margin-bottom: 10px;
          padding: 10px;
          cursor: pointer;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
        }

        .board-content {
          flex-grow: 1;
          padding: 20px;
        }
      `}</style>
    </div>
  );
};

export default BoardList;
