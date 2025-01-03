import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	selectAll,
	selectItem,
	createItem,
} from "../../Redux/ItemReducer";
import { setOpenTable, updateColumns, updateTable } from "../../Redux/BoardReducer";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import ColumnCreatorModal from "./ColumnCreatorModal";
import "./Tables.css";
import TableResume from "./TableResume";
import ColorPicker from "../ChromePicker/ChromePicker";
import { renderDate, renderEnum, renderNumber, renderText } from "./render";

const Tables = ({ table, view, activeBoard }) => {
	const dispatch = useDispatch();
	const [createModal, setCreateModal] = useState(false);
	const [columns, setColumns] = useState(activeBoard.columns);
	const openTable = useSelector((state) => state.board.openTable);
	const selectedItems = useSelector((state) => state.items.selectedItems);
	const [updateMonth, setUpdateMonth] = useState(false);
	const [updateNameMonth, setUpdateNameMonth] = useState("");


	let items = table.content.filter((item) => {
		if (!view.filters) return true;
		return view.filters.every((filter) => {
			const columnValue = item.columns[filter.column]?.value;
			switch (filter.operator) {
				case "égal":
					return columnValue === filter.value;
				case "contient":
					return columnValue?.toString().includes(filter.value);
				case "supérieur":
					return parseFloat(columnValue) > parseFloat(filter.value);
				case "inférieur":
					return parseFloat(columnValue) < parseFloat(filter.value);
				default:
					return false;
			}
		});
	});


	if (Array.isArray(items) && items.length === 0) {
		return;
	}

	const handleSelectItem = (itemId) => {
		dispatch(selectItem(itemId));
	};

	const handleSelectAll = (isSelectedAll) => {
		dispatch(selectAll());
	};

	const toggleMonth = (month) => {
		dispatch(setOpenTable(month));
	};

	const handleCreateItem = (tableId, title = "Nouvel élément") => {
		dispatch(
			createItem({
				formateur: undefined,
				table: tableId,
				createdAt: new Date().toISOString(),
				columns: {
					"title": {
						value: title,
						type: "text",
					},
				},
			})
		);
	};

	const handleColumnCreate = (data) => {

		data.order = Object.keys(columns).length + 1;
		data.width = 200;
		data.value = Object.keys(columns).length + 1;

		dispatch(
			updateColumns({
				id: activeBoard._id,
				data: {
					...columns,
					[Object.keys(columns).length + 1]: data,
				},
			})
		);
		setCreateModal(false);
	};

	if (!table) {
		return <div>Loading...</div>;
	}

	const handleSetColors = (color) => {
		dispatch(updateTable({ ...table, color: color }));
	}

	return (
		<div className="table-view-container">
			<div key={table._id} className="month-section"
				style={{
					borderLeft: "3px solid" + table.color,
				}}
			>
				{openTable?.find(
					(item) => item._id === table._id
				) ? (
					<>
						<div className="month-header month-active" style={{
							borderLeft: "none", paddingLeft: "10px",
						}}
							onClick={() => toggleMonth(table)}
						>
							<span style={{ color: table.color }}>▼</span>
							<span style={{ color: table.color }}
								onClick={(e) => {
									console.log("click");
									e.stopPropagation();
									setUpdateMonth(!updateMonth);
									setUpdateNameMonth(table.title);
								}}
							> {
									updateMonth ?
										<input
											type="text"
											value={updateNameMonth}
											// mettre le cursor à la fin
											autoFocus
											onChange={(e) => {
												e.stopPropagation();
												setUpdateNameMonth(e.target.value);
											}}
											onBlur={(e) => {
												e.stopPropagation();
												dispatch(updateTable({
													...table, title: e.target.value
												}));
												setUpdateMonth(false);
											}}
										/>
										:
										table.title
								}</span>
							<ColorPicker color={table} setColor={handleSetColors} />
						</div>
						<table>
							<TableHeader
								table={table}
								activeBoard={activeBoard}
								columns={columns}
								setCreateModal={setCreateModal}
								handleSelectAll={handleSelectAll}
								selectedItems={selectedItems}
								months={toggleMonth}
							/>
							<TableBody
								table={table}
								columns={columns}
								activeBoard={activeBoard}
								handleSelectItem={handleSelectItem}
								selectedItems={selectedItems}
								handleCreateItem={handleCreateItem}
							/>
						</table>
					</>
				) : (
					<table>
						<TableResume
							table={table}
							activeBoard={activeBoard}
							columns={columns}
							setCreateModal={setCreateModal}
							handleSelectAll={handleSelectAll}
							selectedItems={selectedItems}
							months={toggleMonth}
						/>
					</table>

				)}
			</div>
			{
				createModal && (
					<ColumnCreatorModal
						handleColumnCreate={handleColumnCreate}
						setCreateModal={setCreateModal}
						columns={columns}
					/>
				)
			}
		</div >
	);
};

export default Tables;
