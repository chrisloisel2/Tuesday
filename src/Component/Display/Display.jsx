import React, { useEffect, useState } from "react";
import BoardList from "../BoardList/BoardList";
import "./Display.css";
import Board from "../Boards/Board";
import { GetBoards, selectBoard, setSelectedView } from "../../Redux/BoardReducer";
import { useDispatch, useSelector } from "react-redux";

const Display = () => {
	const boards = useSelector((state) => state.board.board);
	const dispatch = useDispatch();
	const activeBoard = useSelector((state) => state.board.activeBoard);

	useEffect(() => {
		dispatch(GetBoards());
	}, [dispatch]);

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
