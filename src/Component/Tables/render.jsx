import React from 'react';
import DateRangeBadge from '../DateRangeBadge/DateRangeBadge';
import { FaAccessibleIcon, FaFile } from 'react-icons/fa';


const renderDate = (cells, table) => {

	if (cells.length === 0) return <p>no</p>;

	let min = cells[0].value.start;
	let max = cells[0].value.end;
	cells.map((item, index) => {
		if (item.value.start < min) {
			min = new Date(item.value.start);
		}
		if (item.value.end > max) {
			max = new Date(item.value.end);
		}
	});
	if (min === max) {
		return (
			<p></p>
		)
	}

	return (
		<DateRangeBadge startDate={min} endDate={max} color={table.color} />
	);

	// switch (value.show) {
	// 	case "minmax":
	// 		let min = new Date(items?.length > 0 ? items[0].columns[key].start : new Date());
	// 		let max = new Date(items?.length > 0 ? items[0].columns[key].end : new Date());

	// 		items?.map((item, index) => {
	// 			if (item.columns[key] !== undefined) {
	// 				if (new Date(item.columns[key].start) < min) {
	// 					min = new Date(item.columns[key].start);
	// 					max = new Date(item.columns[key].end);
	// 				}
	// 				if (new Date(item.columns[key].end) > max) {
	// 					max = new Date(item.columns[key].end);
	// 				}
	// 			}
	// 		});

	// 		if (min === max) {
	// 			return (
	// 				<p>
	// 					no date
	// 				</p>
	// 			)
	// 		}

	// 		return (
	// 			<DateRangeBadge startDate={min} endDate={max} color={table.color} />
	// 		);
	// 	default:
	// 		return null;
	// }
}

const renderAverage = (cells) => {
	if (cells.length === 0) return <p>no</p>;

	const values = cells.map(c => parseFloat(c.value)).filter(v => !isNaN(v));
	if (values.length === 0) return <p>no valid numbers</p>;

	const sum = values.reduce((a, b) => a + b, 0);
	const avg = (sum / values.length).toFixed(2);

	return (
		<div className='flex w-full h-full justify-center items-center font-bold text-[1rem]'>
			{avg.toString().replace(/\.00$/, '')}
		</div>
	);
};

const renderSum = (cells) => {
	if (cells.length === 0) return <p>no</p>;

	const values = cells.map(c => parseFloat(c.value)).filter(v => !isNaN(v));
	if (values.length === 0) return <p>no valid numbers</p>;

	const sum = values.reduce((a, b) => a + b, 0).toFixed(2);

	return (
		<div className='flex w-full h-full justify-center items-center font-bold text-[1rem]'>
			{sum.toString().replace(/\.00$/, '')}
		</div>
	);
};

const renderMin = (cells) => {
	if (cells.length === 0) return <p>no</p>;

	const values = cells.map(c => parseFloat(c.value)).filter(v => !isNaN(v));
	if (values.length === 0) return <p>no valid numbers</p>;

	const min = Math.min(...values).toFixed(2);

	return (
		<div className='flex w-full h-full justify-center items-center font-bold text-[1.2rem]'>
			{min.toString().replace(/\.00$/, '')}
		</div>
	);
};

const renderMax = (cells) => {
	if (cells.length === 0) return <p>no</p>;

	const values = cells.map(c => parseFloat(c.value)).filter(v => !isNaN(v));
	if (values.length === 0) return <p>no valid numbers</p>;

	const max = Math.max(...values).toFixed(2);

	return (
		<div className='flex w-full h-full justify-center items-center text-red-600 font-bold text-[1.2rem]'>
			Max: {max}
		</div>
	);
};

const renderEnum = (cells) => {

	if (cells.length === 0) {
		return <p>no</p>
	}

	const cellPercent = cells.reduce((acc, item) => {
		const found = acc.find(obj => obj.value.label === item.value.label);
		if (found) {
			found.count += 1;
		} else {
			acc.push({ value: item.value, count: 1, color: item.color });
		}
		return acc;
	}, []).map(item => ({
		...item,
		count: `${(item.count / cells.length * 100).toFixed(2)}%`
	}));

	return (
		<div className='flex w-full h-full'>
			{
				cellPercent.map((item, index) => {
					return (
						<div key={index} style={{
							backgroundColor: item.value.color, width: item.count, color: item.color, display: "flex", justifyContent: "center", alignItems: "center"
						}} className='text-white font-bold text-[1.2rem]'>
							&nbsp;
						</div>
					);
				})
			}
		</div >
	);
};

const renderFile = (cells) => {

	if (cells.length === 0) {
		return <p></p>
	}

	return (
		<div className='flex w-full h-full justify-center items-center font-bold text-[1rem]'>
			<p className='text-[1rem] font-bold'>
				<FaFile className='text-[1.5rem] text-white' />
			</p>
		</div>
	);
}


export { renderAverage, renderMax, renderDate, renderMin, renderSum, renderEnum, renderFile };
