import React from 'react';
import { format } from 'date-fns';
import './DateRangeBadge.css'; // Fichier CSS séparé pour les styles

const DateRangeBadge = ({ startDate, endDate, color }) => {
	// Formater les dates en fonction du format souhaité
	console.log("START", startDate);
	console.log("END", endDate);
	const formattedStartDate = format(new Date(startDate), "MMM d");
	const formattedEndDate = format(new Date(endDate), "MMM d");


	return (
		<div className="date-badge"
			style={{ backgroundColor: color }}
		>
			{formattedStartDate} - {formattedEndDate}
		</div>
	);
};

export default DateRangeBadge;
