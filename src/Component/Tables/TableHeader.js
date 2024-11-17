import React, { useState } from "react";
import ColorPicker from "../ChromePicker/ChromePicker";
import ResizeHandle from "./ResizeHandle";
import { BsThreeDots } from "react-icons/bs";
import { GetBoards, updateColumns } from "../../Redux/BoardReducer";
import { useDispatch, useSelector } from "react-redux";


const ContextMenu = ({ columnId, onClose, onDelete }) => {

	return (
		<div className="context-menu"
			style={{
				position: "absolute",
				top: "30px",
				right: "10px",
				backgroundColor: "white",
				border: "1px solid black",
			}}
		>
			<div className="menu-item" onClick={() => onDelete(columnId)}>
				<button>Supprimer</button>
			</div>
			<div className="menu-close">
				<button onClick={onClose}>Close</button>
			</div>
		</div>
	);
};


const TableHeader = ({ table, activeBoard, setCreateModal, handleSelectAll, selectedItems, months }) => {
	const dispatch = useDispatch();
	const view = useSelector((state) => state.board.selectedView);
	const [seeTable, setSeeTable] = useState(null);
	const [activeColumn, setActiveColumn] = useState(null);
	const [columns, setColumns] = useState(activeBoard.columns);


	const handleDeleteColumn = (columnId) => {
		const newColumns = { ...columns, [columnId]: null };
		delete newColumns[columnId];
		setColumns(newColumns);
		dispatch(updateColumns({ id: activeBoard._id, data: newColumns }));
		dispatch(GetBoards(activeBoard._id));
	};


	const openMenu = (columnId) => {
		setActiveColumn(columnId);
	};

	const seebuttonTable = (table) => {
		setSeeTable(table);
	}

	const hidebuttonTable = (table) => {
		setSeeTable(null);
	}

	const closeMenu = () => {
		setActiveColumn(null); // Ferme la modale
	};

	return (
		<>
			<thead>
				<tr>
					<th style={{ width: `40px` }}>
						<input
							type="checkbox"
							onChange={(e) => handleSelectAll(e.target.checked)}
							checked={selectedItems.length === table.content.length}
						/>
					</th>
					{Object.entries(columns)
						.sort(([, a], [, b]) => a.order - b.order)
						.filter(([key, value]) => view.hiddenColumns?.includes(key) === false)
						.map(([key, value]) => (
							<th key={key} style={{ width: `${columns[key].width}px` }}
								onMouseEnter={() => seebuttonTable(key)}
								onMouseLeave={() => hidebuttonTable(key)}
								contentEditable={true}
								suppressContentEditableWarning={true}
								spellCheck="false"
								onBlur={(e) => {
									e.stopPropagation();
									const newColumns = { ...columns, [key]: { ...columns[key], value: e.target.innerText } };
									if (newColumns[key].value !== columns[key].value) {
										setColumns(newColumns);
										dispatch(updateColumns({ id: activeBoard._id, data: newColumns }));
									}
								}
								}
							>
								{activeBoard.columns[key].value}
								{
									seeTable === key && (
										<BsThreeDots onClick={(e) => {
											e.stopPropagation();
											openMenu(key)
										}}
											style={{
												cursor: "pointer",
												position: "absolute",
												top: "40%",
												right: "10px",
											}}
										/>
									)
								}
								{activeColumn === key && <ContextMenu columnId={key} onClose={closeMenu} onDelete={handleDeleteColumn} />}
								<ResizeHandle columnKey={key} activeBoard={activeBoard} columns={columns} setColumns={setColumns} />
							</th>
						))}
					<th style={{ width: "40px" }}>
						<button className="create-button" onClick={() => setCreateModal(true)}
							style={{
								backgroundColor: "#30324e",
								color: "white",
							}}
						>
							+
						</button>
					</th>
				</tr>
			</thead>
		</>
	);
};

export default TableHeader;
