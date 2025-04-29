import React from 'react';
import DateRangeBadge from '../DateRangeBadge/DateRangeBadge';
import DateModal from '../DateModal/DateModal';
import { createCell, updateCell } from '../../Redux/cellReducer';
import { useDispatch, useSelector } from 'react-redux';

const DateCell = ({ columnKey, itemId, color }) => {
	const selectedItems = useSelector((state) => state.items.selectedItems);
	const cell = useSelector((state) => state.cell.cells[`${itemId}-${columnKey}`]);
	const dispatch = useDispatch();
	const [isDateModalOpen, setIsDateModalOpen] = React.useState({});


	const handleUpdate = (newValue) => {
		if (selectedItems.length > 1) {
			selectedItems.forEach((item) => {
				dispatch(updateCell({ itemId: item, columnId: columnKey, value: newValue }));
			});
			return;
		}
		else {
			dispatch(updateCell({ itemId, columnId: columnKey, value: newValue }));
		}
	};

	const handleCreate = (newValue) => {
		if (selectedItems.length > 1) {
			selectedItems.forEach((item) => {
				dispatch(createCell({ itemId: item, columnId: columnKey, value: newValue }));
			});
			return;
		}
		else {
			dispatch(createCell({ itemId, columnId: columnKey, value: newValue }));
		}
	};

	const openDateModal = (key) => {
		if (isDateModalOpen[key]) {
			setIsDateModalOpen({});
		}
		else {
			setIsDateModalOpen({ [key]: true });
		}
	}

	if (!cell) {
		return (
			<td id={columnKey} className="date-cell" onClick={() => {
				openDateModal(columnKey);
			}}>
				{isDateModalOpen[columnKey] && (
					<DateModal
						isOpen={isDateModalOpen[columnKey]}
						onClose={() => setIsDateModalOpen({})}
						initialDates={{
							start: cell?.value?.start ? new Date().toISOString() : null,
							end: cell?.value?.end ? new Date().toISOString() : null,
						}}
						handleSaveDate={(newDates) => {
							handleCreate({
								start: newDates.start.toISOString(),
								end: newDates.end.toISOString(),
							});
							setIsDateModalOpen({});
						}}
					/>
				)}
			</td >
		);
	}

	return (
		<>
			<td id={columnKey}
				className="date-cell"
				onClick={() => {
					openDateModal(columnKey);
				}}>
				{isDateModalOpen[columnKey] && (
					<DateModal
						isOpen={isDateModalOpen[columnKey]}
						onClose={() => setIsDateModalOpen({})}
						initialDates={{
							start: cell.value?.start,
							end: cell.value?.end,
						}}
						handleSaveDate={(newDates) => {
							handleUpdate({
								start: newDates.start.toISOString(),
								end: newDates.end.toISOString(),
							});
							setIsDateModalOpen({});
						}}
					/>
				)}
				<DateRangeBadge
					startDate={cell.value?.start}
					endDate={cell.value?.end}
					color={color}
				/>
			</td>
		</>
	);
};

export default DateCell;
