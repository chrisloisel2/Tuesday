import React from "react";
import Item from "../Items/Item";
import { renderItem } from "./TableResume";
import { useDispatch, useSelector } from "react-redux";
import { createItem, selectItem } from "../../Redux/ItemReducer";
import { orderBy } from "../ViewList/OrderModal";

const TableBody = ({ table }) => {
	const activeBoard = useSelector((state) => state.board.activeBoard);
	const view = useSelector((state) => state.view.selectedView);
	const columns = useSelector((state) => state.board.activeBoard.columns);
	const cells = useSelector((state) => state.cell.cells);
	const dispatch = useDispatch();

	const handleCreateItem = (tableId, columns) => {
		dispatch(
			createItem({
				table: tableId,
				createdAt: new Date().toISOString(),
				columns: columns,
			})
		);
	};

	return (
		<tbody>
			{
				[...table.content]
					.sort((a, b) => {
						const order = view.orderColumns || [];
						return order.indexOf(a._id) - order.indexOf(b._id);
					})
					// .filter((item) => {
					// 	if (!view.filters) return true;
					// 	return view.filters.every((filter) => {
					// 		console.log("items ->", item);
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
					// })
					.filter(column => !view.hiddenColumns?.includes(column._id))
					.map((item) => (
						<Item key={item} itemId={item} color={table.color} columns={activeBoard.columns} />
					))}
			<tr>
				<td colSpan="1"></td>
				{[...columns]
					.sort((a, b) => {
						const order = view.orderColumns || [];
						return order.indexOf(a._id) - order.indexOf(b._id);
					})
					.filter(column => !view.hiddenColumns?.includes(column._id))
					.map((value) => (
						<React.Fragment key={value._id}>
							{value.name === "Title" ? (
								<td colSpan="1">
									<input
										type="text"
										onKeyDown={(e) => {
											if (e.key === "Enter") {
												handleCreateItem(table._id, [
													{ columnId: value._id, value: e.target.value },
												]);
												e.target.value = "";
											}
										}}
										className="text-black w-full h-full"
										placeholder="Ajouter un élément"
									/>
								</td>
							) : (
								<td style={{ width: `${value?.width}px` }}>
									{renderItem(cells, value, view, table)}

									{/* {renderItem(table.content, value._id, value, activeBoard, table, view)} */}
								</td>
							)}
						</React.Fragment>
					))}
				<th></th>
			</tr>
		</tbody>
	);
};

export default TableBody;
