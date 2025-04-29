import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateColumns } from '../../Redux/BoardReducer';
import { createCell } from '../../Redux/cellReducer';

const makeRandomColor = () => {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};

const EnumCell = ({ columnKey, item, activeEnumColumn, setActiveEnumColumn }) => {
	const dispatch = useDispatch();
	const selectedItems = useSelector((state) => state.items.selectedItems);
	const cell = useSelector((state) => state.cell.cells[`${item._id}-${columnKey}`]);
	const column = useSelector((state) => state.board.activeBoard.columns.find((col) => col._id === columnKey));
	const [editLabel, setEditLabel] = useState(false);
	const [valueLabel, setValueLabel] = useState('');

	useEffect(() => {
		if (cell?.value?.label) {
			const enumValue = column?.possibleValues.find((value) => value.label === cell.value.label);
			if (enumValue) {
				setValueLabel(enumValue.label);
			}
		}
	}, [cell, column]);

	const handleEnumClick = (enumValue) => {
		if (selectedItems.length > 1) {
			selectedItems.forEach((item) => {
				dispatch(createCell({
					itemId: item,
					columnId: columnKey,
					value: { label: enumValue.label, color: enumValue.color },
				}));
			});
			return;
		}
		else {
			dispatch(createCell({
				itemId: item._id,
				columnId: columnKey,
				value: { label: enumValue.label, color: enumValue.color },
			}));
		}
		setActiveEnumColumn(null);
	};

	const handleLabelEdit = () => {
		const updatedPossibleValues = [
			...column.possibleValues,
			{ label: valueLabel, color: makeRandomColor() },
		];

		dispatch(updateColumns({
			...column,
			possibleValues: updatedPossibleValues,
		}));
		setValueLabel('');
		setEditLabel(false);
	};

	return (
		<td
			onClick={() => setActiveEnumColumn(activeEnumColumn === columnKey ? null : columnKey)}
			style={{ backgroundColor: cell?.value?.color, position: 'relative' }}
		>
			<div className="text-[16px] font-[700] border-[#E0E0E0] text-[white] text-shadow-black">
				{cell?.value?.label || ''}
			</div>
			{activeEnumColumn === columnKey && (
				<div className="modalEnum">
					<div className="modal-arrow" />
					<div>
						{column?.possibleValues.map((enumValue, index) => (
							<div
								key={index}
								className="enumOption"
								onClick={() => handleEnumClick(enumValue)}
							>
								<div className="enumColor" style={{ backgroundColor: enumValue.color }} />
								<div className="enumLabel text-[12px] font-[500] text-shadow-black">
									{enumValue.label}</div>
							</div>
						))}
					</div>
					<div className="modal-footer w-[170px]">
						{editLabel ? (
							<div className="edit-label flex flex-row gap-2 items-center">
								<input
									type="text"
									value={valueLabel}
									onChange={(e) => setValueLabel(e.target.value)}
									onClick={(e) => e.stopPropagation()}
								/>
								<button onClick={handleLabelEdit}>Save</button>
							</div>
						) : (
							<button
								onClick={(e) => {
									e.stopPropagation();
									setEditLabel(true);
								}}
							>
								<i className="edit-icon" /> Edit Labels
							</button>
						)}
					</div>
				</div>
			)}
		</td>
	);
};

export default EnumCell;
