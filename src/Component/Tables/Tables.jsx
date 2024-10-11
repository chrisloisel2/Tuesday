import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getItemsByFormateur,
	deleteItem,
	updateItem,
	createItem,
} from "../../Redux/ItemReducer";
import "./Tables.css";
import ColorPicker from "../ChromePicker/ChromePicker";
import Item from "../Items/Item";
import { updateTable } from "../../Redux/BoardReducer";



const Tables = ({ table }) => {
	const dispatch = useDispatch();
	const [openMonths, setOpenMonths] = useState([]);
	const [editableItemId, setEditableItemId] = useState(null);
	const [editedItem, setEditedItem] = useState({});

	const toggleMonth = (month) => {
		if (openMonths.includes(month)) {
			setOpenMonths(openMonths.filter((m) => m !== month));
		} else {
			setOpenMonths([...openMonths, month]);
		}
	};

	const handleDelete = (itemId) => {
		const confirmed = window.confirm(
			"Êtes-vous sûr de vouloir supprimer cet élément ?"
		);
		if (confirmed) {
			dispatch(deleteItem(itemId));
		}
	};

	const handleEditClick = (item) => {
		setEditableItemId(item._id);
		setEditedItem({
			title: item.title,
			stack: item.stack,
			start: new Date(item.start).toISOString().substr(0, 10),
			end: new Date(item.end).toISOString().substr(0, 10),
			location: item.location,
		});
	};

	const handleEditSubmit = (itemId) => {
		dispatch(updateItem({ ...editedItem, _id: itemId }));
		setEditableItemId(null);
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

	return (
		<div className="table-view-container">
			<div key={table._id} className="month-section"
				style={{
					backgroundColor: table.color,
					borderLeft: `10px solid ${table.color}`,
					borderRadius: "5px",
				}}
			>
				<div
					className={`month-header ${openMonths.includes(table) ? "month-active" : "month-inactive"
						}`}
					onClick={() => toggleMonth(table)}
				>
					<ColorPicker color={table} setColor={handleColorChange} />
					<span>{table.title}</span>
					<span>{openMonths.includes(table) ? "▼" : "▲"}</span>
				</div>
				{
					openMonths.includes(table) &&
					(
						(
							<table>
								<thead>
									<tr>
										<th>Titre</th>
										<th>Stack</th>
										<th>Formateur</th>
										<th>Lieu</th>
										<th>Date</th>
										<th>Nb de Jours</th>
										<th>TJM</th>
										<th>CA TTC</th>
										<th>CA HT</th>
									</tr>
								</thead>
								<tbody>
									{
										table.content.map((item) => (
											<tr key={item._id}>
												<Item item={item} color={table.color} />
											</tr>
										))

									}
									<tr>
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
