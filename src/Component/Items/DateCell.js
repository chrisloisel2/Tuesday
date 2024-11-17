import React from 'react';
import DateRangeBadge from '../DateRangeBadge/DateRangeBadge';
import DateModal from '../DateModal/DateModal';

const DateCell = ({ columnKey, item, color, handleUpdate }) => {
	const handleChange = (e) => {
		const newEditedItem = {
			...item,
			columns: {
				...item.columns,
				[columnKey]: {
					...item.columns[columnKey],
					value: e.target.innerText,
				},
			},
		};
		handleUpdate(newEditedItem);
	};
	const [isDateModalOpen, setIsDateModalOpen] = React.useState({});

	const openDateModal = (key) => {
		if (isDateModalOpen[key]) {
			setIsDateModalOpen({});
		}
		else {
			setIsDateModalOpen({ [key]: true });
		}
	}
	// { isOpen, onClose, initialDates, onSave }
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
							start: item.columns[columnKey]?.start,
							end: item.columns[columnKey]?.end,
						}}
						handleSaveDate={(newDates) => {
							const newEditedItem = {
								...item,
								columns: {
									...item.columns,
									[columnKey]: {
										...item.columns[columnKey],
										start: newDates.start.toISOString(),
										end: newDates.end.toISOString(),
									},
								},
							};
							handleUpdate(newEditedItem);
							setIsDateModalOpen({});
						}}
					/>
				)}
				<DateRangeBadge
					startDate={item.columns[columnKey]?.start}
					endDate={item.columns[columnKey]?.end}
					color={color}
				/>
			</td>
		</>
	);
};

export default DateCell;
