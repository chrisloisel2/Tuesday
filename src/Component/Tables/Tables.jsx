import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpenTable, updateTable } from "../../Redux/TablesReducer";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import ColumnCreatorModal from "./ColumnCreatorModal";
import "./Tables.css";
import TableResume from "./TableResume";
import ColorPicker from "../ChromePicker/ChromePicker";
import { renderDate, renderEnum, renderNumber, renderText } from "./render";

const Tables = ({ tableId }) => {
	const dispatch = useDispatch();
	const table = useSelector((state) => state.table.tables).find(
		(table) => table._id === tableId
	);
	const [createModal, setCreateModal] = useState(false);
	const openTable = useSelector((state) => state.board.openTable);
	const selectedItems = useSelector((state) => state.items.selectedItems);
	const [updateTableModal, setupdateTableModal] = useState(false);
	const [updateNameMonth, setUpdateNameMonth] = useState(table?.title);



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
				{openTable?.find((item) => item._id === table._id) ? (
					<>
						<div className="month-header month-active" style={{
							borderLeft: "none", paddingLeft: "10px",
						}}
							onClick={() => dispatch(setOpenTable(table))}
						>
							<span style={{ color: table.color }}>▼</span>
							<span style={{ color: table.color }}
								onClick={(e) => {
									e.stopPropagation();
									setupdateTableModal(!updateTable);
									setUpdateNameMonth(table.title);
								}}
							> {
									updateTableModal ?
										<input
											type="text"
											value={updateNameMonth}
											autoFocus
											className="text-black"
											onChange={(e) => {
												e.stopPropagation();
												setUpdateNameMonth(e.target.value);
											}}
											onBlur={(e) => {
												e.stopPropagation();
												dispatch(updateTable({
													...table, title: e.target.value
												}));
												setupdateTableModal(false);
											}}
										/>
										:
										<div onClick={(e) => {
											e.stopPropagation();
											setupdateTableModal(!updateTableModal);
											setUpdateNameMonth(table.title);
										}
										}>
											{table.title}
										</div>
								}</span>
							<ColorPicker color={table} setColor={handleSetColors} />
						</div>
						<table>
							<TableHeader
								table={table}
								setCreateModal={setCreateModal}
								selectedItems={selectedItems}
							/>
							<TableBody table={table} />
						</table>

					</>
				) : (
					<table>
						<TableResume
							table={table}
							setCreateModal={setCreateModal}
						/>
					</table>
				)}
			</div>
			{
				createModal && (
					<ColumnCreatorModal
						setCreateModal={setCreateModal}
					/>
				)
			}
		</div >
	);
};

export default Tables;
