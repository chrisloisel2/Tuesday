import React, { useState } from "react";
import ColorPicker from "../ChromePicker/ChromePicker";
import ResizeHandle from "./ResizeHandle";
import { IoMdArrowDropright } from "react-icons/io";
import { renderDate, renderEnum, renderFormula, renderNumber, renderText } from "./render";
import { ImFontSize } from "react-icons/im";
import { useSelector } from "react-redux";

const renderItem = (items, key, value, activeBoard, table) => {
	let count = 0;

	switch (value.type) {
		case "text":
			return renderText(items, key, value);
		case "number":
			return renderNumber(items, key, value);
		case "date":
			return renderDate(items, key, value, table);
		case "enum":
			return renderEnum(items, key, value, activeBoard.columns);
		case "formula":
			return renderFormula(items, key, value, activeBoard.columns);
		default:
			return "Unknown";
	}

}


const TableResume = ({ table, activeBoard, setCreateModal, handleSelectAll, selectedItems, months }) => {

	const view = useSelector((state) => state.board.selectedView);
	const [columns, setColumns] = useState(activeBoard.columns);

	return (
		<>
			<thead>
				<tr>
					{Object.entries(activeBoard.columns)
						.sort(([, a], [, b]) => a.order - b.order)
						.filter(([key, value]) => view.hiddenColumns?.includes(key) === false)
						.map(([key, value]) => (
							<th key={key} style={{ width: `${columns[key].width}px` }} onClick={() => months(table)}>
								{
									activeBoard.columns[key].value === "Title" ?
										<span style={{
											color: table.color,
											fontWeight: "bold",
											textTransform: "uppercase",
											fontSize: "1.2rem",
											display: "flex",
											alignItems: "center",
										}}>
											<IoMdArrowDropright
												style={{ color: table.color, fontSize: "2rem" }}
											/>
											{table.title}</span>
										:
										activeBoard.columns[key].value
								}
								<ResizeHandle columnKey={key}
									activeBoard={activeBoard}
									columns={columns}
									setColumns={setColumns}
								/>
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
			<tbody>
				{Object.entries(activeBoard.columns)
					.sort(([, a], [, b]) => a.order - b.order)
					.filter(([key, value]) => view.hiddenColumns?.includes(key) === false)
					.map(([key, value]) => (
						<>
							{key === "title" ? (
								<th key={key} style={{ width: `${columns[key]?.width}px` }} onClick={() => months(table)}>
									items: {
										table?.content?.length
									}
								</th>
							) :
								<th key={key} style={{ width: `${columns[key]?.width}px` }} onClick={() => months(table)}>
									{
										renderItem(table.content, key, value, activeBoard, table)
									}
								</th>
							}
						</>

					))}
				<th></th>
			</tbody >
		</>
	);
};

export { renderItem };

export default TableResume;
