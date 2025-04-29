import React, { useEffect, useState } from "react";
import Tables from "../Tables/Tables";
import Calendrier from "../Calendar/Calendar";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { createTable, getTable } from "../../Redux/TablesReducer";
import "./Board.css";
import ViewList from "../ViewList/ViewList";
import SelectedPannel from "../SelectedPannel/SelectedPannel";

const Board = () => {
	const selectedView = useSelector((state) => state.view.selectedView);
	const activeBoard = useSelector((state) => state.board.activeBoard);
	const dispatch = useDispatch();

	useEffect(() => {
		if (activeBoard?._id === undefined) return;
		for (let table of activeBoard?.tables) {
			dispatch(getTable(table));
		}
	}, [activeBoard, selectedView]);


	if (activeBoard?._id === undefined) {
		return <div>Veuillez sélectionner un tableau</div>;
	}


	return (
		<div className="formation-board w-screen h-screen flex flex-col">
			<div className="view-switcher">
				<ViewList />
			</div>
			<div className="content">
				{
					selectedView?.type === "table" &&
					activeBoard?.tables?.map((table) => (
						<Tables key={table._id} tableId={table} />
					))
				}

				<SelectedPannel />
				{selectedView?.type === "calendar" ? <Calendrier activeBoard={activeBoard} />
					: <button
						onClick={() => dispatch(createTable(activeBoard._id))}
						style={{
							cursor: "pointer",
							display: "flex",
							alignItems: "center",
							gap: "6px",
							fontSize: "20px",
							padding: "10px",
						}}>
						<MdAdd />
						AddTable
					</button>
				}
			</div>
		</div>
	);
};

export default Board;
