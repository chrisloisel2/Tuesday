import React, { useEffect, useState } from "react";
import Tables from "../Tables/Tables";
import Calendrier from "../Calendar/Calendar";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { createTable, setSelectedView } from "../../Redux/BoardReducer";
import "./Board.css";
import ViewList from "../ViewList/ViewList";
import SelectedPannel from "../SelectedPannel/SelectedPannel";

const Board = ({ activeBoard }) => {
	const selectedView = useSelector((state) => state.board.selectedView);
	const selectedItems = useSelector((state) => state.items.selectedItems);
	const items = useSelector((state) => state.items.items);
	const [columns, setColumns] = useState({});
	const dispatch = useDispatch();

	useEffect(() => {
		setColumns(activeBoard?.columns);
	}, [activeBoard]);

	const handleAddTable = () => {
		dispatch(createTable(activeBoard._id));
	}

	// const handleViewChange = (view) => {
	// 	dispatch(setSelectedView(view));
	// };

	if (activeBoard === null) {
		return <div>Veuillez sélectionner un tableau</div>;
	}

	return (
		<div className="formation-board">
			<div className="view-switcher">
				<ViewList />
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
				<div>
					{selectedItems.length > 0 && (
						<SelectedPannel />
					)}
				</div>
				{selectedView?.type === "calendar" && <Calendrier activeBoard={activeBoard} />}
			</div>
		</div>
	);
};

export default Board;
