import React, { useEffect, useState } from "react";
import Tables from "../Tables/Tables";
import Calendrier from "../Calendar/Calendar";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { createTable } from "../../Redux/BoardReducer";
import "./Board.css";
import ViewList from "../ViewList/ViewList";

const Board = ({ activeBoard }) => {
	const boards = useSelector((state) => state.board.board);
	const [columns, setColumns] = useState({});
	const [selectedView, setselectedView] = useState();
	const dispatch = useDispatch();

	useEffect(() => {
		setColumns(activeBoard?.columns);
	});

	const handleAddTable = () => {
		dispatch(createTable(activeBoard._id));
	}

	const handleViewChange = (view) => {
		console.log("view", view);
		setselectedView(view);
	};

	if (activeBoard === null) {
		return <div>Veuillez sélectionner un tableau</div>;
	}

	return (
		<div className="formation-board">
			<div className="view-switcher">
				<ViewList views={activeBoard} change={handleViewChange} activeVew={selectedView} />
			</div>

			<div className="content">
				{
					selectedView?.type === "table" &&
					activeBoard?.content?.map((item) => (
						<Tables key={item._id} table={item} view={selectedView} activeBoard={activeBoard} />
					))
				}
				{selectedView?.type === "table" &&
					(
						<button
							onClick={handleAddTable}
							style={{
								cursor: "pointer",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								fontSize: "20px",
							}}>
							<MdAdd />
							AddTable
						</button>
					)}
				{selectedView?.type === "calendar" && <Calendrier activeBoard={activeBoard} />}
			</div>
		</div>
	);
};

export default Board;
