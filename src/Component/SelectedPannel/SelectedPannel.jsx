import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem } from '../../Redux/ItemReducer';

const SelectedPanel = () => {
	const selectedItem = useSelector((state) => state.items.selectedItems);
	const dispatch = useDispatch();

	const handleDelete = () => {
		selectedItem.forEach((item) => {
			dispatch(deleteItem(item));
		});
	}


	return (
		<div className="selected-panel">
			<h3>Items Selectionnés</h3>
			<div className="selected-items">
				<h4>{selectedItem.length} items</h4>
				<button onClick={handleDelete}>Supprimer</button>
			</div>
		</div>
	);
};

export default SelectedPanel;
