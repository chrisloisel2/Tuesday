import React, { useRef, useState } from 'react';

const EditableCell = ({ columnKey, item, handleUpdate, handleDelete }) => {
	const [showIcon, setShowIcon] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const cellRef = useRef(null); // Référence pour capturer le contenu

	const handleChange = () => {
		const newValue = cellRef.current.innerText; // Récupérer le texte via la référence
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
			ref={cellRef} // Associer la référence
			id={columnKey}
			contentEditable
			suppressContentEditableWarning={true}
			onBlur={handleChange}
			spellCheck="false"
			onMouseEnter={() => setShowIcon(true)}
			onMouseLeave={() => setShowIcon(false)}
			style={{ position: 'relative' }}
		>
			{item.columns[columnKey]?.value}
		</td>
	);
};

export default EditableCell;
