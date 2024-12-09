import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateColumns } from '../../Redux/BoardReducer';

const makeRandomColor = () => {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};


const EnumCell = ({ columnKey, item, activeEnumColumn, setActiveEnumColumn, handleUpdate }) => {
	const dispatch = useDispatch();
	const board = useSelector((state) => state.board.activeBoard);
	const [editLabel, setEditLabel] = useState(false);
	const [valueLabel, setValueLabel] = useState('');

	const handleEnumClick = (enumValue) => {
		const newEditedItem = {
			...item,
			columns: {
				...item.columns,
				[columnKey]: {
					...item.columns[columnKey],
					value: enumValue,
				},
			},
		};
		handleUpdate(newEditedItem);
		setActiveEnumColumn(null);
	};

	const handleLabelEdit = () => {
		let data = {
			...board.columns,
			[columnKey]: {
				...board.columns[columnKey],
				values: {
					...board.columns[columnKey].values,
					[valueLabel]: makeRandomColor(),
				},
			},
		};

		console.log(data);

		dispatch(
			updateColumns({ id: board._id, data })
		);
		setEditLabel(false);
	};

	return (
		<td
			id={columnKey}
			onClick={() => setActiveEnumColumn(activeEnumColumn === columnKey ? null : columnKey)}
			style={{
				// backgroundColor: board.columns[columnKey]?.values[item.columns[columnKey]?.value],
				position: 'relative',
			}}
		>
			{item.columns[columnKey]?.value}
			{activeEnumColumn === columnKey && (
				<div className="modalEnum">
					<div className="modal-arrow" />
					<div className="modal-content">
						{Object.keys(board.columns[columnKey]?.values).map((enumValue, index) => (
							<div
								key={index}
								className="enumOption"
								onClick={() => handleEnumClick(enumValue)}
							>
								<div className="enumColor" style={{ backgroundColor: board.columns[columnKey]?.values[enumValue] }} />
								<div className="enumLabel">{enumValue}</div>
							</div>
						))}
					</div>
					<div className="modal-footer">
						{editLabel ? (
							<div className="edit-label">
								<input type="text" onChange={(e) => {
									e.preventDefault();
									setValueLabel(e.target.value);
								}}
									onClick={(e) => e.stopPropagation()}
								/>
								<button onClick={handleLabelEdit}>Save</button>
							</div>
						) : (
							<button onClick={(e) => {
								e.stopPropagation();
								setEditLabel(true);
							}}>
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
