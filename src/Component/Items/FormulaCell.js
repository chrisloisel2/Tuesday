import React, { useState, useEffect } from 'react';
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from 'react-redux';
import { updateCell, createCell } from '../../Redux/cellReducer';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const FormulaCell = ({ columnKey, item }) => {
	const dispatch = useDispatch();
	const cells = useSelector((state) => state.cell.cells);
	const cell = useSelector((state) => state.cell.cells[`${item._id}-${columnKey}`]);
	const column = useSelector((state) => state.board.activeBoard.columns.find((col) => col._id === columnKey));

	const [showIcon, setShowIcon] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [computedValue, setComputedValue] = useState("");

	// Calcul dynamique des formules
	useEffect(() => {
		console.log("match", column);
		if (column?.formula) {
			try {
				const formulaValue = column.formula.replace(/\b([a-zA-Z0-9_]+)\b/g, (match) => {
					console.log("match", match);
					const matchedColumn = cells[`${item._id}-${match}`];
					return matchedColumn?.value || 0;
				});

				const result = eval(formulaValue);
				setComputedValue(result);
			} catch (error) {
				setComputedValue("Erreur");
			}
		} else {
			setComputedValue(cell?.value || "");
		}
	}, [cell, column, item]);

	// Gestion de l'édition d'une cellule non-formule
	const handleBlur = (e) => {
		const newValue = e.target.innerText;
		if (cell) {
			dispatch(updateCell({
				itemId: item._id,
				columnId: columnKey,
				value: newValue,
			}));
		} else {
			dispatch(createCell({
				itemId: item._id,
				columnId: columnKey,
				value: newValue,
			}));
		}
	};

	const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);

	const handleDelete = () => {
		dispatch(updateCell({ itemId: item._id, columnId: columnKey, value: "" }));
		setShowDeleteModal(false);
	};

	return (
		<td
			id={columnKey}
			contentEditable={!column?.formula}
			suppressContentEditableWarning
			onBlur={handleBlur}
			spellCheck={false}
			onMouseEnter={() => setShowIcon(true)}
			onMouseLeave={() => setShowIcon(false)}
			style={{ position: 'relative' }}
		>
			{computedValue}

			{showIcon && (
				<ImCross
					onClick={toggleDeleteModal}
					style={{
						position: 'absolute',
						right: '10px',
						top: '50%',
						transform: 'translateY(-50%)',
						cursor: 'pointer',
						color: '#d9534f',
					}}
				/>
			)}

			{showDeleteModal && (
				<DeleteConfirmationModal
					onClose={toggleDeleteModal}
					onConfirm={handleDelete}
				/>
			)}
		</td>
	);
};

export default FormulaCell;
