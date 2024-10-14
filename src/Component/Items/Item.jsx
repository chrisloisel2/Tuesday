import React, { useMemo, useState } from 'react';
import DateRangeBadge from '../DateRangeBadge/DateRangeBadge';
import { updateItem } from '../../Redux/ItemReducer';
import { useDispatch } from 'react-redux';

const Item = ({ item, color, columns }) => {
	const [editedItem, setEditedItem] = useState({
		...item,
		columns: { ...item.columns }
	});
	const dispatch = useDispatch();


	const calculatePrice = useMemo(() => {
		return editedItem.tjm * editedItem.nbDays;
	}, [editedItem.tjm, editedItem.nbDays]);

	const calculatePriceWithTax = useMemo(() => {
		if (new Date(editedItem.end).getFullYear() < 2024) {
			return calculatePrice;
		}
		return calculatePrice * 1.20;
	}, [calculatePrice]);

	const handleChange = (e) => {
		editedItem[e.target.id] = e.target.innerText;
		dispatch(updateItem({ ...editedItem, _id: item._id }));
	};

	Object.entries(item.columns).map(([key, value]) => {
		if (value.type === 'enum') {
			console.log("KEY", key);
			console.log("COLUMNS", columns);
			console.log("ALED", columns[key].color[value.value]);
		}

	}

	);

	return (
		<>
			{
				Object.entries(item.columns).map(([key, value]) => {
					if (value.type === 'date') {
						console.log("DATE", item.columns[key]);
						console.log("Date2", item.start, item.columns[key].start);
						return (
							<td key={key} id={key} contentEditable onInput={handleChange} suppressContentEditableWarning={true}>
								<DateRangeBadge startDate={item.columns[key].start} endDate={item.columns[key].end} color={color} />
							</td>
						);
					}

					else {
						return (
							<td
								key={key}
								id={key}
								{
								...value.type === 'enum' ? {
									className: 'enum'
								} : {
									contentEditable: true,
									onBlur: (e) => {
										if (e.target.innerText !== item.columns[key].value) {
											handleChange(e);
										}
									}
								}
								}
								suppressContentEditableWarning={true}
								onInput={handleChange}
								style={{
									backgroundColor: `${value.type === 'enum' ? columns[key].color[value.value] : 'transparent'
										}`,
								}}
							>
								{
									value.value
								}
							</td >
						)
					}
				}
				)
			}
		</>
	);
};

export default Item;
