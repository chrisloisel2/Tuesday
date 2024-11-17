import React, { useState } from 'react';
import { ImCross } from "react-icons/im";
import DeleteConfirmationModal from './DeleteConfirmationModal'; // Importer la modale

const EditableCell = ({ columnKey, item, handleUpdate, handleDelete }) => {
	const [showIcon, setShowIcon] = useState(false); // État pour afficher/masquer l'icône
	const [showDeleteModal, setShowDeleteModal] = useState(false); // État pour afficher/masquer la pop-up

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
			contentEditable
			suppressContentEditableWarning={true}
			onBlur={handleChange}
			onInput={handleChange}
			spellCheck="false"
			onMouseEnter={() => setShowIcon(true)} // Afficher l'icône au survol
			onMouseLeave={() => setShowIcon(false)} // Masquer l'icône lorsque la souris quitte
			style={{ position: 'relative' }}
		>
			{item.columns[columnKey]?.value}

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

export default EditableCell;
