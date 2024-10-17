import React, { useMemo, useState } from 'react';
import DateRangeBadge from '../DateRangeBadge/DateRangeBadge';
import { updateItem } from '../../Redux/ItemReducer';
import { useDispatch } from 'react-redux';

const Item = ({ item, color, columns }) => {
	const [editedItem, setEditedItem] = useState(item);
	const [activeEnumColumn, setActiveEnumColumn] = useState(null); // État pour la colonne active
	const dispatch = useDispatch();

	const handleChange = (e) => {
		const newEditedItem = {
			...editedItem,
			columns: {
				...editedItem.columns,
				[e.target.id]: {
					...editedItem.columns[e.target.id],
					value: e.target.innerText,
				},
			},
		};
		setEditedItem(newEditedItem);
		dispatch(updateItem(newEditedItem)); // Utilisation de la nouvelle valeur directement
	};

	const handleEnumClick = (key, value) => {
		// Créer un nouvel objet avec la valeur mise à jour
		const newEditedItem = {
			...editedItem,
			columns: {
				...editedItem.columns,
				[key]: {
					...editedItem.columns[key],
					value: value,
				},
			},
		};

		// Mettre à jour l'état et envoyer au back
		setEditedItem(newEditedItem);
		dispatch(updateItem(newEditedItem)); // Envoi immédiat de la nouvelle version au back-end
		setActiveEnumColumn(null); // Fermer la modale après la sélection
	};

	return (
		<>
			{
				Object.entries(item.columns).map(([key, value]) => {
					if (item.columns[key] === undefined) {
						return (
							<td key={key} id={key} contentEditable onInput={handleChange} suppressContentEditableWarning={true}>
							</td>
						);
					}
					if (value.type === 'date') {
						return (
							<td key={key} id={key} contentEditable onInput={handleChange} suppressContentEditableWarning={true}>
								<DateRangeBadge startDate={item.columns[key]?.start} endDate={item.columns[key]?.end} color={color} />
							</td>
						);
					}
					if (value.type === 'enum') {
						return (
							<td key={key} id={key} onClick={() => setActiveEnumColumn(activeEnumColumn === key ? null : key)} // Activer/désactiver la modale uniquement pour cette colonne
								style={{
									backgroundColor: columns[key]?.values[item.columns[key]?.value],
									position: 'relative',
								}}
							>
								{item.columns[key]?.value}
								{activeEnumColumn === key && (
									<div className="modalEnum">
										<div className="modal-arrow" />
										<div className="modal-content">
											{Object.keys(columns[key].values).map((enumValue, index) => (
												<div key={index}
													className="enumOption"
													onClick={() => handleEnumClick(key, enumValue)} // Utiliser la fonction de mise à jour
												>
													<div className="enumColor" style={{ backgroundColor: columns[key].values[enumValue] }} />
													<div className="enumLabel">{enumValue}</div>
												</div>
											))}
										</div>
										<div className="modal-footer">
											<i className="edit-icon" /> Edit Labels
										</div>
									</div>
								)}
							</td>
						);
					}
					else {
						return (
							<td
								key={key}
								id={key}
								contentEditable
								onBlur={(e) => {
									if (e.target.innerText !== item.columns[key]?.value) {
										handleChange(e);
									}
								}}
								suppressContentEditableWarning={true}
								onInput={handleChange}
							>
								{value.value}
							</td>
						);
					}
				})
			}
		</>
	);
};

export default Item;
