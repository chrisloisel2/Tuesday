import React from 'react';

const ChartTypeSelector = ({ selectedType, onSelectType }) => {
	const chartTypes = ['bar', 'line', 'pie'];

	return (
		<div>
			<h3>Select Chart Type</h3>
			{chartTypes.map((type) => (
				<button
					key={type}
					onClick={() => onSelectType(type)}
					style={{
						margin: '5px',
						backgroundColor: selectedType === type ? '#007bff' : '#f1f1f1',
						color: selectedType === type ? '#fff' : '#000',
					}}
				>
					{type.charAt(0).toUpperCase() + type.slice(1)}
				</button>
			))}
		</div>
	);
};

export default ChartTypeSelector;
