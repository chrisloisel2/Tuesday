import React, { useEffect, useState } from "react";
import BoardList from "../../Component/BoardList/BoardList";
import "./Display.css";
import Board from "../../Component/Boards/Board";
import { GetBoardFromUser, GetBoards, selectBoard, setSelectedView } from "../../Redux/BoardReducer";
import { useDispatch, useSelector } from "react-redux";

const Display = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const boards = useSelector((state) => state.board.board);
	const status = useSelector((state) => state.board.status);
	const activeBoard = useSelector((state) => state.board.activeBoard);

	useEffect(() => {
		if (status === "idle") {
			dispatch(GetBoards());
		}
	}, [boards]);

	if (boards === undefined) {
		return <div>Veuillez créer un tableau</div>;
	}
	return (
		<div className="display-container">
			<BoardList />{" "}
			<div className="board-content">
				<Board activeBoard={activeBoard} />
			</div>
		</div>
	);
};

export default Display;
