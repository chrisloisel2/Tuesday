import React, { useEffect, useState } from "react";
import Tables from "../Tables/Tables";
import Calendrier from "../Calendar/Calendar";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { createTable } from "../../Redux/BoardReducer";

const Board = ({ activeBoard }) => {
	const [viewMode, setViewMode] = useState("calendar");
	const boards = useSelector((state) => state.board.board);
	const dispatch = useDispatch();

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
						<Tables key={item._id} table={item} />
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
				{viewMode === "calendar" && <Calendrier />}
			</div>

			<style jsx>{`
        .view-switcher {
          margin-bottom: 20px;
        }
        .view-switcher button {
          margin-right: 10px;
          padding: 10px;
          cursor: pointer;
        }
        .view-switcher button.active {
          background-color: #007bff;
          color: white;
        }
      `}</style>
		</div>
	);
};

export default Board;
