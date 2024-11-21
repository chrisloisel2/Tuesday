import React, { useEffect, useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import FormationBoard from "../Boards/Board";
import { useDispatch, useSelector } from "react-redux";
import { GetBoard, selectBoard } from "../../Redux/BoardReducer";

const BoardList = () => {
	const dispatch = useDispatch();
	const activeBoard = useSelector((state) => state.board.activeBoard);
	const boards = useSelector((state) => state.board.board);

	return (
		<div className="board-list-container">
			<div className="menu">
				{boards.map((board, index) => (
					<button
						key={board._id}
						className={`board-item${activeBoard === index ? "-active" : ""}`}
						onClick={() => dispatch(GetBoard(board._id))}
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
		</div >
	);
};

export default BoardList;
