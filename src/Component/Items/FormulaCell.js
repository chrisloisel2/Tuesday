import React, { useState, useEffect } from 'react';
import { ImCross } from "react-icons/im";
import DeleteConfirmationModal from './DeleteConfirmationModal';

const FormulaCell = ({ columnKey, item, columns, handleUpdate, handleDelete }) => {
	const [showIcon, setShowIcon] = useState(false); // Afficher/masquer l'icône
	const [showDeleteModal, setShowDeleteModal] = useState(false); // Afficher/masquer la modale
	const [computedValue, setComputedValue] = useState(null); // Affiche le résultat de la formule

	useEffect(() => {
		const calculateFormula = () => {
			const formula = columns[columnKey]?.formula;
			if (!formula) return;

			const formulaValue = formula.replace(/\b([a-zA-Z0-9_]+)\b/g, (match) => {
				return item.columns[match]?.value || 0;
			});

			try {
				const result = eval(formulaValue);
				setComputedValue(result);
			} catch (error) {
				setComputedValue("Erreur");
			}
		};

		calculateFormula();
	}, [item, columnKey, columns]);

	const handleChange = (e) => {
		const newValue = e.target.innerText;
		const newEditedItem = {
			...item,
			columns: {
				...item.columns,
				[columnKey]: {
					...item.columns[columnKey],
					value: newValue,
				},
			},
		};
		handleUpdate(newEditedItem);
	};

	const toggleDeleteModal = () => {
		setShowDeleteModal(!showDeleteModal);
	};

	return (
		<td
			id={columnKey}
			contentEditable={!item.columns[columnKey]?.formula} // Désactive l'édition si c'est une formule
			suppressContentEditableWarning={true}
			onBlur={handleChange}
			onInput={handleChange}
			spellCheck="false"
			onMouseEnter={() => setShowIcon(true)}
			onMouseLeave={() => setShowIcon(false)}
			style={{ position: 'relative' }}
		>
			{/* Affiche la valeur calculée ou la valeur de la colonne */}
			{computedValue !== null ? computedValue : item.columns[columnKey]?.value}

			{/* Icône de suppression */}
			{showIcon && (
				<ImCross
					onClick={toggleDeleteModal}
					style={{
						position: 'absolute',
						right: '10px',
						cursor: 'pointer',
						color: '#d9534f'
					}}
				/>
			)}

			{/* Pop-up de confirmation */}
			{showDeleteModal && (
				<DeleteConfirmationModal
					onClose={toggleDeleteModal}
					onConfirm={() => handleDelete(columnKey)}
				/>
			)}
		</td>
	);
};

export default FormulaCell;
