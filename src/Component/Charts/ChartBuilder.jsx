import React, { useState } from 'react';
import ChartTypeSelector from './ChartTypeSelector';
import ChartConfigurator from './ChartConfigurator';
import ChartDisplay from './ChartDisplay';

const ChartBuilder = () => {
	const [chartType, setChartType] = useState('bar');
	const [data, setData] = useState([{ name: 'Category A', value: 120 }, { name: 'Category B', value: 200 }]);

	const handleTypeChange = (type) => setChartType(type);
	const handleDataChange = (newData) => setData(newData);

	return (
		<div>
			<h2>Custom Chart Builder</h2>
			<ChartTypeSelector selectedType={chartType} onSelectType={handleTypeChange} />
			<ChartConfigurator onUpdateConfig={handleDataChange} />
			<ChartDisplay chartType={chartType} data={data} />
		</div>
	);
};

export default ChartBuilder;
