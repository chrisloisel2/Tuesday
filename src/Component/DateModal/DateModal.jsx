import React, { useState } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './DateModal.css'; // Importation du CSS stylisé

const DateModal = ({ isOpen, onClose, initialDates, handleSaveDate }) => {
	const [startDate, setStartDate] = useState(new Date(initialDates.start));
	const [endDate, setEndDate] = useState(new Date(initialDates.end));

	const handleSave = () => {
		handleSaveDate({ start: startDate, end: endDate });
		onClose();
	};

	return (
		<div className="custom-modal"
			onClick={(e) => e.stopPropagation()}
		>
			<div className="date-picker-container">
				<div className="date-field">
					<DatePicker
						selected={startDate}
						onChange={(date) => setStartDate(date)}
						selectsStart
						startDate={startDate}
						endDate={endDate}
					/>
				</div>
				<div className="date-field">
					<DatePicker
						selected={endDate}
						onChange={(date) => setEndDate(date)}
						selectsEnd
						startDate={startDate}
						endDate={endDate}
						minDate={startDate}
					/>
				</div>
			</div>
			<div className="button-container">
				<button onClick={handleSave}>Save</button>
				<button onClick={onClose}>Cancel</button>
			</div>
		</div>
	);
};

export default DateModal;
