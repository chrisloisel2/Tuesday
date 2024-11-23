import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditableCell from './EditableCell';
import EnumCell from './EnumCell';
import DateCell from './DateCell';
import './Item.css';
import { updateItem } from '../../Redux/ItemReducer';
import DateModal from '../DateModal/DateModal';
import FormulaCell from './FormulaCell';
import { FaFileAlt } from "react-icons/fa";

const Item = ({ item, color, columns, activeBoard }) => {
	const [editedItem, setEditedItem] = useState(item);
	const [activeEnumColumn, setActiveEnumColumn] = useState(null);
	const [isDateModalOpen, setIsDateModalOpen] = useState(false); // État pour ouvrir/fermer le modal de date
	const [currentDateColumn, setCurrentDateColumn] = useState(null); // Colonne actuelle pour la date
	const view = useSelector((state) => state.board.selectedView);
	const dispatch = useDispatch();

	// console.log('ITEM DEBUG', item);

	const handleDelete = (columnKey) => {
		const newEditedItem = {
			...editedItem,
			columns: {
				...editedItem.columns,
				[columnKey]: null, // Supprimer la colonne
			},
		};
		setEditedItem(newEditedItem);
		dispatch(updateItem(newEditedItem));
	};

	const handleUpdate = (newEditedItem) => {
		setEditedItem(newEditedItem);
		dispatch(updateItem(newEditedItem));
	};

	const openDateModal = (columnKey) => {
		setCurrentDateColumn(columnKey);
		setIsDateModalOpen(true);
	};

	const handleSaveDate = (newDates) => {
		const newEditedItem = {
			...editedItem,
			columns: {
				...editedItem.columns,
				[currentDateColumn]: {
					...editedItem.columns[currentDateColumn],
					start: newDates.start.toISOString(),
					end: newDates.end.toISOString(),
				},
			},
		};
		handleUpdate(newEditedItem);
		setIsDateModalOpen(false);
	};

	const handleFileUpload = async (file, key) => {
		const formData = new FormData();
		formData.append('file', file);

		try {
			setUploading(true);
			const response = await axios.post('/api/upload', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});

			const fileUrl = response.data.fileUrl;

			const newEditedItem = {
				...editedItem,
				columns: {
					...editedItem.columns,
					[key]: {
						...editedItem.columns[key],
						value: fileUrl,
					},
				},
			};

			handleUpdate(newEditedItem);
		} catch (error) {
			console.error('Error uploading file:', error);
		} finally {
			setUploading(false);
		}
	};


	return (
		<>
			{Object.entries(columns)
				.sort(([, a], [, b]) => a.order - b.order)
				.filter(([key, value]) => view.hiddenColumns?.includes(key) === false)
				.map(([key, value]) => {
					switch (columns[key]?.type) {
						case 'date':
							return (
								<>
									<DateCell
										key={key}
										columnKey={key}
										item={item}
										color={color}
										openDateModal={() => openDateModal(key)}
										handleUpdate={handleUpdate}
									/>
								</>
							);
						case 'enum':
							return (
								<EnumCell
									key={key}
									columnKey={key}
									item={item}
									columns={columns}
									activeEnumColumn={activeEnumColumn}
									setActiveEnumColumn={setActiveEnumColumn}
									handleUpdate={handleUpdate}
									board={activeBoard}
								/>
							);

						case 'formula':
							return (
								<FormulaCell
									key={key}
									columnKey={key}
									item={item}
									columns={columns}
									handleDelete={handleDelete}
									handleUpdate={handleUpdate}
								/>
							);
						case 'Id':
							return (
								<td key={key} style={{ color: item.columns[key]?.color }}>
									{item._id}
								</td>);
						case 'file':
							return (
								<td key={key} style={{ color: item.columns[key]?.color }}>
									{item.columns[key]?.value ? (
										<a
											href={item.columns[key]?.value}
											target="_blank"
											rel="noopener noreferrer"
											style={{ display: 'flex', alignItems: 'center' }}
										>
											<FaFileAlt
												style={{
													color: item.columns[key]?.color,
													fontSize: '1.5rem',
													marginRight: '5px',
												}}
											/>
											View File
										</a>
									) : (
										<input
											type="file"
											disabled={uploading}
											onChange={(e) =>
												handleFileUpload(e.target.files[0], key)
											}
										/>
									)}
								</td>
							);
						default:
							return (
								<EditableCell
									key={key}
									columnKey={key}
									item={item}
									handleDelete={handleDelete}
									handleUpdate={handleUpdate}
								/>
							);
					}
				})}

			{isDateModalOpen && (
				<DateModal
					isOpen={isDateModalOpen}
					onClose={() => setIsDateModalOpen(false)}
					initialDates={{
						start: new Date(editedItem.columns[currentDateColumn]?.start),
						end: new Date(editedItem.columns[currentDateColumn]?.end),
					}}
					onSave={handleSaveDate}
				/>
			)}
		</>
	);
};

export default Item;
