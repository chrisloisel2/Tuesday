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
import { updateTable } from "../../Redux/BoardReducer";



const Tables = ({ table }) => {
	const dispatch = useDispatch();
	const [openTable, setOpenTable] = useState([]);
	const selectedItems = useSelector((state) => state.items.selectedItems);


	const handleResizeMouseDown = (col) => (event) => {
		console.log("Resize", col);
		const startX = event.clientX;
		const startWidth = table.columns[col].taille;

		const onMouseMove = (e) => {
			const newWidth = startWidth + (e.clientX - startX);
			table.columns[col].taille = newWidth;
		};

		const onMouseUp = () => {
			dispatch(updateTable({
				...table, columns: { ...table.columns, [col]: { ...table.columns[col], taille: startWidth } }
			})
			);
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseup", onMouseUp);
		};

		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseup", onMouseUp);
	};

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
		console.log("Create Item", tableId);
		dispatch(
			createItem({
				title: title,
				stack: "stack",
				table: tableId,
				start: new Date().toISOString().substr(0, 10),
				end: new Date().toISOString().substr(0, 10),
				location: "Lieu",
				table: tableId,
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

	if (table.columns === undefined) {
		return <div>loading...</div>
	}

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
											Object.entries(table.columns).map(([key, value]) => (
												<th
													key={key}
													style={{ width: `${table.columns[key].taille}px` }}
												>
													{table.columns[key].value}
													<div
														className="resize-handle"
														onMouseDown={handleResizeMouseDown(key)}
													/>
												</th>
											))
										}
										<th style={{ width: `40px` }}>
											<button>+</button>
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
												<Item item={item} color={table.color} columns={table.columns} />
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
