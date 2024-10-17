import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getItemsByFormateur,
	deleteItem,
	updateItem,
	createItem,
	selectAll,
	selectItem,
} from "../../Redux/ItemReducer";
import "./Tables.css";
import ColorPicker from "../ChromePicker/ChromePicker";
import Item from "../Items/Item";
import { updateColumns, UpdateBoard, updateTable } from "../../Redux/BoardReducer";



const Tables = ({ table, view, activeBoard }) => {
	const dispatch = useDispatch();
	const [columns, setColumns] = useState(activeBoard.columns); // S'assurer que columns est initialisé
	const [openTable, setOpenTable] = useState([]);
	const selectedItems = useSelector((state) => state.items.selectedItems);

	const handleResizeMouseDown = (col) => (event) => {
		const startX = event.clientX;
		const startWidth = columns[col]?.width || 100; // Valeur par défaut

		const onMouseMove = (e) => {
			const newWidth = Math.max(50, startWidth + (e.clientX - startX)); // Limiter à 50px minimum
			setColumns((prevColumns) => ({
				...prevColumns,
				[col]: {
					...prevColumns[col],
					width: newWidth,
				},
			}));
		};

		const onMouseUp = () => {
			// Enregistrer la nouvelle largeur
			dispatch(updateColumns({
				id: activeBoard._id,
				data: {
					...columns,
				}
			}));
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseup", onMouseUp);
		};

		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseup", onMouseUp);
	};


	const handleColumnCreate = (boardId) => {
		console.log("Create Column", activeBoard._id);
		dispatch(updateColumns(
			{
				id: activeBoard._id,
				data: {
					value: "column",
					type: "text",
				}
			}
		));
	}

	const handleSelectItem = (itemId) => {
		dispatch(selectItem(itemId));
	};

	const handleSelectAll = (isSelectedAll) => {
		dispatch(selectAll());
	};

	const toggleMonth = (month) => {
		if (openTable.includes(month)) {
			setOpenTable(openTable.filter((m) => m !== month));
		} else {
			setOpenTable([...openTable, month]);
		}
	};

	const handleCreateItem = (tableId,
		title = "Nouvel élément",
	) => {
		dispatch(
			createItem({
				formateur: undefined,
				table: tableId,
				createdAt: new Date().toISOString(),
				columns: activeBoard.columns,
			})
		);
	}

	const handleColorChange = (color, table) => {
		console.log("Color Change", { ...table, color: color });
		dispatch(updateTable({ ...table, color: color }));
	};

	if (table === undefined) {
		return <div>loading...</div>
	}
	// console.log("Table", Object.keys(table.columns));

	// if (table.columns === undefined) {
	// 	return <div>loading...</div>
	// }

	return (
		<div className="table-view-container">
			<div key={table._id} className="month-section">
				<div
					className={`month-header ${openTable.includes(table) ? "month-active" : "month-inactive"}`}
					style={{
						borderLeft: openTable.includes(table) ? "none" : `10px solid ${table.color}`,
					}} onClick={() => toggleMonth(table)}>
					<span style={{
						color: table.color,
					}}>{openTable.includes(table) ? "▼" : "►"}</span>
					<span
						style={{
							color: table.color,
						}}
					>{table.title}</span>
					<ColorPicker color={table} setColor={handleColorChange} />
				</div>
				{
					openTable.includes(table) &&
					(
						(
							<table
								style={{
									borderLeft: `10px solid ${table.color}`,
								}}
							>
								<thead
									style={{
									}}
								>
									<tr>
										<th style={{ width: `40px` }}>
											<input type="checkbox"
												onChange={(e) => handleSelectAll(e.target.checked)}
												checked={selectedItems.length === table.content.length}
											/>
										</th>
										{
											Object.entries(activeBoard.columns).map(([key, value]) => (
												<th
													key={key}
													style={{ width: `${columns[key].width}px` }}
												>
													{activeBoard.columns[key].value}
													<div
														className="resize-handle"
														onMouseDown={handleResizeMouseDown(key)}
													/>
												</th>
											))
										}
										<th style={{
											width: `40px`,
										}}>
											<button
												style={{
													backgroundColor: "transparent",
													border: "none",
													color: "black",
													fontSize: "20px",
													cursor: "pointer",
												}}
												onClick={() => handleColumnCreate(activeBoard._id)}
											>+</button>
										</th>
									</tr>
								</thead>
								<tbody>
									{
										[...new Map(table.content.map(item => [item._id, item])).values()].map((item) => (
											<tr key={item._id}
												className={`${selectedItems.includes(item._id) ? "selected" : ""}`}
											>
												<td>
													<input type="checkbox"
														onChange={() => handleSelectItem(item._id)}
														checked={selectedItems.includes(item._id)}
													/>
												</td>
												<Item item={item} color={table.color} columns={activeBoard.columns} />
												<td>
												</td>
											</tr>
										))
									}
									<tr>
										<td colSpan="1">
										</td>
										<td colSpan="1">
											<input
												type="text"
												onKeyDown={(e) => {
													if (e.key === "Enter") {
														handleCreateItem(table._id, e.target.value);
														e.target.value = "";
													}
												}
												}
											/>
										</td>
									</tr>
								</tbody>
							</table>
						)
					)
				}
			</div>
		</div >
	);
};

export default Tables;
