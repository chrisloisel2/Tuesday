import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCell, updateCell } from '../../Redux/cellReducer';

const EditableCell = ({ itemId, columnKey }) => {
	const dispatch = useDispatch();
	const cellRef = useRef(null);
	const selectedItems = useSelector((state) => state.items.selectedItems);
	const cell = useSelector((state) => state.cell.cells[`${itemId}-${columnKey}`]);

	const handleBlur = () => {
		const newValue = cellRef.current?.textContent?.trim() || "";

		if (selectedItems.length > 1) {
			console.log("selectedItems superieur à 1");
			selectedItems.forEach((item) => {
				console.log("item", item);
				dispatch(createCell({ itemId: item, columnId: columnKey, value: newValue }));
			});
			return;
		}
		else {
			dispatch(createCell({ itemId, columnId: columnKey, value: newValue }));
		}
	}

	return (
		<td
			ref={cellRef}
			id={columnKey}
			contentEditable
			suppressContentEditableWarning={true}
			spellCheck="false"
			onBlur={handleBlur}
			style={{ position: 'relative' }}
		>
			{cell?.value || ""}
		</td>
	);
};

export default EditableCell;
