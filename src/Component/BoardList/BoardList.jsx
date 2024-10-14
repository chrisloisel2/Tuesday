import React, { useEffect, useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import FormationBoard from "../Boards/Board";
import { useSelector } from "react-redux";

const BoardList = ({ activeBoard, setActiveBoard }) => {
	const boards = useSelector((state) => state.board.board);

	return (
		<div className="board-list-container">
			<div className="menu">
				{boards.map((board) => (
					<button
						key={board._id}
						className={`board-item${activeBoard?._id === board._id ? "-active" : ""
							}`}
						onClick={() => setActiveBoard(board)}
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
		</div >
	);
};

export default BoardList;
