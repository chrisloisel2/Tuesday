import React from 'react';
import { format } from 'date-fns';
import './DateRangeBadge.css'; // Fichier CSS séparé pour les styles

const DateRangeBadge = ({ startDate, endDate, color }) => {

	if (!startDate || !endDate) {
		return null;
	}

	const formattedStartDate = format(new Date(startDate), "MMM d");
	const formattedEndDate = format(new Date(endDate), "MMM d");

	const nbDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));

	const today = new Date();
	const daysElapsed = Math.ceil((today - new Date(startDate)) / (1000 * 60 * 60 * 24));

	const progress = Math.min(100, (daysElapsed / nbDays) * 100);

	return (
		<div className="date-badge">
			<div
				className="progress-bar"
				style={{
					width: `${progress}%`,
					backgroundColor: color,
				}}
			/>
			<div className="date-info">
				{formattedStartDate} - {formattedEndDate}
			</div>
		</div>
	);
};

export default DateRangeBadge;
