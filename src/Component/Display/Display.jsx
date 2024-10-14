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
			setActiveBoard(res?.payload[0]);
		});
	}, [dispatch]);

	return (
		<div className="display-container">
			<BoardList setActiveBoard={setActiveBoard} activeBoard={activeBoard} />{" "}
			<div className="board-content">
				<Board activeBoard={activeBoard} />
			</div>
		</div>
	);
};

export default Display;
