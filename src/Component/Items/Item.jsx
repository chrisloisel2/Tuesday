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
import MyAxios from '../../Interceptor/MyAxios';

const Item = ({ item, color, columns, activeBoard }) => {
	const [editedItem, setEditedItem] = useState(item);
	const [activeEnumColumn, setActiveEnumColumn] = useState(null);
	const [isDateModalOpen, setIsDateModalOpen] = useState(false); // État pour ouvrir/fermer le modal de date
	const [currentDateColumn, setCurrentDateColumn] = useState(null); // Colonne actuelle pour la date
	const view = useSelector((state) => state.board.selectedView);
	const [uploading, setUploading] = useState(false);
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
		// Changer le nom du fichier pour éviter les doublons
		formData.append('name', `${item._id}-${key}`);

		formData.append('file', file);

		try {
			setUploading(true);
			const response = await MyAxios.post('/item/upload', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});

			console.log('File uploaded:', response.fileUrl);
			const fileUrl = response.fileUrl;
			console.log('File uploaded:', fileUrl);

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
	// Object.entries(columns)
	// 	.sort(([, a], [, b]) => a.order - b.order)
	// 	.filter(([key, value]) => view.hiddenColumns?.includes(key) === false)
	// 	.map(([key, value]) => {
	// 		console.log('ITEM DEBUG', key, value);
	// 	});


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
									columnKey={key}
									item={item}
									activeEnumColumn={activeEnumColumn}
									setActiveEnumColumn={setActiveEnumColumn}
									handleUpdate={handleUpdate}
								/>
							);

						case 'diapo':
							if (!item.columns[value?.diapo]?.value) {
								return <td key={key} style={{ color: item.columns[key]?.color }}></td>
							}
							const url = item.columns[value?.diapo]?.value.split('/')[4];
							console.log('DIAPo url', url);

							const link = "/cours/" + url + "/" + item.columns[value?.template]?.value;
							const downloadlink = "/cours/" + url + "/" + item.columns[value?.template]?.value;
							return (
								<td key={key} style={{ color: item.columns[key]?.color }}
									styles={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
										gap: '5rem',
									}}
								>
									<a href={link} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
										cliquer ici
									</a>
								</td>
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
								<td key={key} style={{ color: item.columns[key] }}>
									{item.columns[key]?.value ? (
										<a
											href={item.columns[key]?.value}
											target="_blank"
											rel="noopener noreferrer"
											style={{
												color: 'inherit',
											}}
										>
											<FaFileAlt

												style={{
													color: item.columns[key]?.color,
													fontSize: '1rem',
												}}
											/>
										</a>
									) : (
										<>
											<input
												type="file"
												disabled={uploading}
												onChange={(e) =>
													handleFileUpload(e.target.files[0], key)
												}
												className={`file-input ${uploading ? 'uploading' : ''}`}
											/>
										</>

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
