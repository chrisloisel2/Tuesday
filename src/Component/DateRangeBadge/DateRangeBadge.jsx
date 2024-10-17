import React from 'react';
import { format } from 'date-fns';
import './DateRangeBadge.css'; // Fichier CSS séparé pour les styles

const DateRangeBadge = ({ startDate, endDate, color }) => {
	// Formater les dates en fonction du format souhaité
	const formattedStartDate = format(new Date(startDate), "MMM d");
	const formattedEndDate = format(new Date(endDate), "MMM d");

	// Calculer le nombre total de jours
	const nbDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));

	// Calculer le nombre de jours écoulés
	const today = new Date();
	const daysElapsed = Math.ceil((today - new Date(startDate)) / (1000 * 60 * 60 * 24));

	// Calculer le pourcentage de progression
	const progress = Math.min(100, (daysElapsed / nbDays) * 100); // Limiter à 100% maximum

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
