import React, { useEffect, useState } from "react";
import Tables from "../Tables/Tables";
import Calendrier from "../Calendar/Calendar";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { createTable } from "../../Redux/BoardReducer";
import "./Board.css";
import { SlEarphones } from "react-icons/sl";

const Board = ({ activeBoard }) => {
	const [viewMode, setViewMode] = useState("calendar");
	const boards = useSelector((state) => state.board.board);
	const [selectedItems, setSelectedItems] = useState([]);
	const dispatch = useDispatch();


	const [columnWidths, setColumnWidths] = useState({
		select: 50,
		title: 150,
		stack: 150,
		formateur: 150,
		location: 150,
		date: 150,
		nbDays: 100,
		tjm: 100,
		caTTC: 100,
		caHT: 100,
	});



	useEffect(() => {
		setViewMode("tables");
		console.log("raffraichir", activeBoard);
	}, [boards.length]);

	const handleAddTable = () => {
		dispatch(createTable(activeBoard._id));
	}

	const handleViewChange = (view) => {
		setViewMode(view);
	};

	if (activeBoard === null) {
		return <div>Veuillez sélectionner un tableau</div>;
	}

	return (
		<div className="formation-board">
			<div className="view-switcher">
				<button
					className={viewMode === "tables" ? "active" : ""}
					onClick={() => handleViewChange("tables")}
				>
					Formation
				</button>
				<button
					className={viewMode === "calendar" ? "active" : ""}
					onClick={() => handleViewChange("calendar")}
				>
					Calendrier
				</button>
			</div>

			<div className="content">
				{
					viewMode === "tables" &&
					activeBoard?.content?.map((item) => (
						<Tables key={item._id} table={item} selectedItems={selectedItems} setSelectedItems={setSelectedItems} columnWidths={columnWidths} setColumnWidths={setColumnWidths} />
					))
				}
				{viewMode === "tables" &&
					(
						<button
							onClick={handleAddTable}
							style={{
								cursor: "pointer",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								fontSize: "20px",
							}}
						>
							<MdAdd />
							AddTable
						</button>
					)}
				{viewMode === "calendar" && <Calendrier activeBoard={activeBoard} />}
			</div>
		</div>
	);
};

export default Board;
