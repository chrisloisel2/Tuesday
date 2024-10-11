import React, { useEffect, useState } from "react";
import BoardList from "../BoardList/BoardList";
import "./Display.css";
import Board from "../Boards/Board";
import { GetBoards } from "../../Redux/BoardReducer";
import { useDispatch, useSelector } from "react-redux";

const Display = () => {
	const [activeBoard, setActiveBoard] = useState(null);
	const boards = useSelector((state) => state.board.boards);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(GetBoards()).then((res) => {
			setActiveBoard(res.payload[0]);
		});
	}, [dispatch]);

	return (
		<div className="display-container">
			<BoardList setActiveBoard={setActiveBoard} activeBoard={activeBoard} />{" "}
			<div className="board-content">
				<Board activeBoard={activeBoard} />
			</div>
			<div id="modal-root"></div>
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
