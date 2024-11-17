import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const SelectedPanel = ({ items, onUpdate, onDelete }) => {
	const selectedItem = useSelector((state) => state.items.selectedItems);

	console.log('Selected Panel :', selectedItem);
	return (
		<div className="selected-panel">
			<h3>Selected Panel</h3>
			{selectedItem && (
				<div>
					<h4>{selectedItem.length}</h4>
				</div>
			)}
		</div>
	);
};

export default SelectedPanel;
