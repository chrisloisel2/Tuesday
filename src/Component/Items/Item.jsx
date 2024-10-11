import React, { useState } from 'react';
import DateRangeBadge from '../DateRangeBadge/DateRangeBadge';
import { updateItem } from '../../Redux/ItemReducer';
import { useDispatch } from 'react-redux';

const Item = ({ item }) => {
	const [editedItem, setEditedItem] = useState({
		title: item.title,
		stack: item.stack,
		formateur: item.formateur,
		location: item.location,
		start: item.start,
		end: item.end,
		nbdays: item.nbdays,
		tjm: item.tjm,
	});
	const dispatch = useDispatch();

	const handleChange = (e) => {
		console.log("item copy :", editedItem);
		console.log("new data :", e.target.innerText);
		console.log("cell index :", e.target.id);
		editedItem[e.target.id] = e.target.innerText;
		console.log("item AFTER copy :", editedItem);

		dispatch(updateItem({ ...editedItem, _id: item._id }));
	};

	return (
		<>
			<td
				contentEditable
				onBlur={handleChange}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						e.preventDefault();
						e.target.blur();
					}
				}}
				id="title"
			><div>{editedItem.title}</div></td>
			<td
				contentEditable
				onBlur={handleChange}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						e.preventDefault();
						e.target.blur();
					}
				}}
			>{editedItem.stack}</td>
			<td
				contentEditable
				onBlur={handleChange}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						e.preventDefault();
						e.target.blur();
					}
				}}
			>{editedItem.formateur}</td>
			<td
				contentEditable
				onBlur={handleChange}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						e.preventDefault();
						e.target.blur();
					}
				}}
			>{editedItem.location}</td>
			<td><DateRangeBadge startDate={editedItem.start} endDate={editedItem.end} /></td>
			<td
				contentEditable
				onBlur={handleChange}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						e.preventDefault();
						e.target.blur();
					}
				}}
			>{editedItem.nbdays}</td>
			<td
				contentEditable
				onBlur={handleChange}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						e.preventDefault();
						e.target.blur();
					}
				}}
			>{editedItem.tjm}</td>
			<td
				contentEditable
				onBlur={handleChange}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						e.preventDefault();
						e.target.blur();
					}
				}}
			>{editedItem.tjm * editedItem.nbdays || "pas de chiffre d'affaire"}</td>
			<td
				contentEditable
				onBlur={handleChange}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						e.preventDefault();
						e.target.blur();
					}
				}}
			>{editedItem.tjm * editedItem.nbdays * 1.20 || "pas de chiffre d'affaire"}</td>
		</>
	);
};

export default Item;
