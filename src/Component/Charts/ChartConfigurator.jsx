import React, { useState } from 'react';

const ChartConfigurator = ({ onUpdateConfig }) => {
	const [data, setData] = useState([{ name: 'Category A', value: 120 }, { name: 'Category B', value: 200 }]);

	const handleDataChange = (index, field, value) => {
		const newData = [...data];
		newData[index][field] = field === 'value' ? Number(value) : value;
		setData(newData);
		onUpdateConfig(newData);
	};

	const addDataSeries = () => {
		setData([...data, { name: `Category ${String.fromCharCode(65 + data.length)}`, value: 100 }]);
		onUpdateConfig(data);
	};

	return (
		<div>
			<h3>Configure Data</h3>
			{data.map((item, index) => (
				<div key={index} style={{ marginBottom: '10px' }}>
					<input
						type="text"
						value={item.name}
						onChange={(e) => handleDataChange(index, 'name', e.target.value)}
						placeholder="Category Name"
					/>
					<input
						type="number"
						value={item.value}
						onChange={(e) => handleDataChange(index, 'value', e.target.value)}
						placeholder="Value"
					/>
				</div>
			))}
			<button onClick={addDataSeries}>Add Data Series</button>
		</div>
	);
};

export default ChartConfigurator;
