import React, { useState } from "react";
import ColorPicker from "../ChromePicker/ChromePicker";
import ResizeHandle from "./ResizeHandle";
import { IoMdArrowDropright } from "react-icons/io";
import { renderAverage, renderDate, renderEnum, renderFile, renderFormula, renderMax, renderMin, renderNumber, renderSum, renderText } from "./render";
import { ImFontSize } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { setOpenTable } from "../../Redux/TablesReducer";

const renderItem = (cells, column, view, table) => {
	if (!view) return true;

	// items = items.filter((item) => {
	// 	if (!view.filters) return true;
	// 	return view.filters.every((filter) => {
	// 		const columnValue = item.columns[filter.column]?.value;
	// 		switch (filter.operator) {
	// 			case "égal":
	// 				return columnValue === filter.value;
	// 			case "contient":
	// 				return columnValue?.toString().includes(filter.value);
	// 			case "supérieur":
	// 				return parseFloat(columnValue) > parseFloat(filter.value);
	// 			case "inférieur":
	// 				return parseFloat(columnValue) < parseFloat(filter.value);
	// 			default:
	// 				return false;
	// 		}
	// 	});
	// });

	// filtrer mes cells en selectionnant les cellules qui correspondent à la colonne
	// cells = Object.keys(cells).filter((item) => {
	// 	if (cells[item].columnId?._id === column._id) {
	// 		return cells[item];
	// 	}
	// })
	const selectedCells = [];

	table?.cells?.forEach((item) => {
		if (item.columnId?._id === column._id) {
			selectedCells.push(item);
		}
	})

	switch (column.resume) {
		case "Average":
			return renderAverage(selectedCells);
		case "Sum":
			return renderSum(selectedCells);
		case "Min":
			return renderMin(selectedCells);
		case "Max":
			return renderMax(selectedCells);
		case "DateSpan":
			return renderDate(selectedCells, table);
		case "Enum":
			return renderEnum(selectedCells);
		case "Length":
			return <p className="text-center text-[1rem] font-bold">items : {selectedCells.length}</p>;
		case "diapo":
			return null;
		case "File":
			return renderFile(selectedCells);
		default:
			return;
	}

}


const TableResume = ({ table, setCreateModal }) => {
	const dispatch = useDispatch();
	const activeBoard = useSelector((state) => state.board.activeBoard);
	const view = useSelector((state) => state.view.selectedView);
	const [columns, setColumns] = useState(activeBoard.columns);
	const cells = useSelector((state) => state.cell.cells);

	return (
		<>
			<thead>
				<tr>
					{[...columns]
						.sort((a, b) => {
							const order = view.orderColumns || [];
							return order.indexOf(a._id) - order.indexOf(b._id);
						})
						.filter(column => !view.hiddenColumns?.includes(column._id))
						.map((column) => (
							<th
								key={column._id}
								style={{ width: `${column.width}px` }}
								onClick={() => dispatch(setOpenTable(table))}
							>
								{column.name === "Title" ? (
									<span
										style={{
											color: table.color,
											fontWeight: "bold",
											textTransform: "uppercase",
											fontSize: "1.2rem",
											display: "flex",
											alignItems: "center",
										}}
									>
										<IoMdArrowDropright
											style={{ color: table.color, fontSize: "2rem" }}
										/>
										{table.title}
									</span>
								) : (
									column.name
								)}
								<ResizeHandle
									columnKey={column._id}
									activeBoard={activeBoard}
									columns={columns}
									setColumns={setColumns}
								/>
							</th>
						))}
					<th style={{ width: "40px" }}>
						<button
							className="create-button"
							onClick={() => setCreateModal(true)}
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
			<tbody>
				<tr className="table-row w-full h-full bg-[yellow]">
					{[...columns]
						.sort((a, b) => {
							const order = view.orderColumns || [];
							return order.indexOf(a._id) - order.indexOf(b._id);
						})
						.filter(column => !view.hiddenColumns?.includes(column._id))
						.map((column) => {
							return (
								<td
									key={column._id}
									style={{ width: `${column.width}px` }}
									onClick={() => dispatch(setOpenTable(table))}
									className="table-cell"
								>
									{renderItem(cells, column, view, table)}
								</td>
							)
						})}
					<td></td>
				</tr>
			</tbody>
		</>
	);
};


export { renderItem };

export default TableResume;
