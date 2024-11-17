import React from 'react';
import ReactECharts from 'echarts-for-react';

const ChartDisplay = ({ chartType, data }) => {
	const chartOptions = {
		title: {
			text: 'Custom Chart',
		},
		tooltip: {},
		xAxis: {
			type: 'category',
			data: data.map((item) => item.name),
		},
		yAxis: {
			type: 'value',
		},
		series: [
			{
				type: chartType,
				data: data.map((item) => item.value),
			},
		],
	};

	return <ReactECharts option={chartOptions} style={{ height: '400px', width: '100%' }} />;
};

export default ChartDisplay;
