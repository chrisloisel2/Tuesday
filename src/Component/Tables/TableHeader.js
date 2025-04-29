import React, { useState } from "react";
import ColorPicker from "../ChromePicker/ChromePicker";
import ResizeHandle from "./ResizeHandle";
import { BsThreeDots } from "react-icons/bs";
import { deleteColumn, GetBoards, updateColumns } from "../../Redux/BoardReducer";
import { useDispatch, useSelector } from "react-redux";
import { selectAll, selectItems } from "../../Redux/ItemReducer";


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


const TableHeader = ({ table, setCreateModal, selectedItems, months }) => {
	const dispatch = useDispatch();
	const activeBoard = useSelector((state) => state.board.activeBoard);
	const columns = useSelector((state) => state.board.activeBoard.columns);
	const [seeTable, setSeeTable] = useState(null);
	const [activeColumn, setActiveColumn] = useState(null);
	const view = useSelector((state) => state.view.selectedView);


	const handleDeleteColumn = (columnId) => {
		dispatch(deleteColumn({ boardID: activeBoard._id, columnID: columnId }));
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
		setActiveColumn(null);
	};

	return (
		<>
			<thead>
				<tr>
					<th style={{ width: `40px` }}>
						<input
							type="checkbox"
							onChange={(e) => dispatch(selectItems(table.content))}
							checked={selectedItems.length === table.content.length}
						/>
					</th>
					{[...columns]
						.sort((a, b) => {
							const order = view.orderColumns || [];
							return order.indexOf(a._id) - order.indexOf(b._id);
						})
						.filter(column => !view.hiddenColumns?.includes(column._id))
						?.map(column => (
							<th key={column._id} style={{ width: `${column.width}px` }}
								onMouseEnter={() => seebuttonTable(column._id)}
								onMouseLeave={() => hidebuttonTable(column._id)}
								contentEditable={true}
								suppressContentEditableWarning={true}
								spellCheck="false"
							>
								{column.name}
								{
									seeTable === column._id && (
										<BsThreeDots onClick={(e) => {
											e.stopPropagation();
											openMenu(column._id)
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
								{activeColumn === column._id && <ContextMenu columnId={column._id} onClose={closeMenu} onDelete={handleDeleteColumn} />}
								<ResizeHandle columnKey={column._id} column={column} />
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
