import React from "react";
import Item from "../Items/Item";
import { renderItem } from "./TableResume";
import { useSelector } from "react-redux";

const TableBody = ({ table, columns, activeBoard, handleSelectItem, selectedItems, handleCreateItem }) => {

	const view = useSelector((state) => state.board.selectedView);

	return (
		<tbody>
			{table.content.map((item) => (
				<tr key={item._id} className={selectedItems.includes(item._id) ? "selected" : ""}>
					<td>
						<input
							type="checkbox"
							onChange={() => handleSelectItem(item._id)}
							checked={selectedItems.includes(item._id)}
						/>
					</td>
					<Item item={item} color={table.color} columns={activeBoard.columns} />
					<th></th>
				</tr>
			))}
			<tr>
				<td colSpan="1"></td>
				{Object.entries(activeBoard.columns)
					.sort(([, a], [, b]) => a.order - b.order)
					.filter(([key, value]) => view.hiddenColumns?.includes(key) === false)
					.map(([key, value]) => (
						<>
							{key === "title" ? (
								<td colSpan="1">
									<input
										type="text"
										onKeyDown={(e) => {
											if (e.key === "Enter") {
												handleCreateItem(table._id, e.target.value);
												e.target.value = "";
											}
										}}
									/>
								</td>
							) :
								<th key={key} style={{ width: `${columns[key]?.width}px` }}>
									{
										renderItem(table.content, key, value, activeBoard, table)
									}
								</th>
							}
						</>

					))}
				<th></th>
			</tr>
		</tbody>
	);
};

export default TableBody;
