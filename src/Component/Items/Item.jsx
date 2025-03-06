import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditableCell from './EditableCell';
import EnumCell from './EnumCell';
import DateCell from './DateCell';
import './Item.css';
import { updateItem } from '../../Redux/ItemReducer';
import DateModal from '../DateModal/DateModal';
import FormulaCell from './FormulaCell';
import FileCpnt from './FileModal';

const Item = ({ item, color, columns, activeBoard }) => {
	const [editedItem, setEditedItem] = useState(item);
	const [activeEnumColumn, setActiveEnumColumn] = useState(null);
	const [isDateModalOpen, setIsDateModalOpen] = useState(false);
	const [currentDateColumn, setCurrentDateColumn] = useState(null);
	const view = useSelector((state) => state.board.selectedView);
	const dispatch = useDispatch();

	const handleDelete = (columnKey) => {
		const newEditedItem = {
			...editedItem,
			columns: {
				...editedItem.columns,
				[columnKey]: null,
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

	const handleFileUpload = async (file) => {
		const formData = new FormData();
		formData.append("file", file);

		try {
			setUploading(true);
			let response;

			response = await MyAxios.post("/item/upload", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			console.log("response 1", response.fileUrl);
			const fileUrl = response.fileUrl;

			console.log("newEditedItem", editedItem);
			const newEditedItem = {
				...editedItem,
				columns: {
					...editedItem.columns,
					file: {
						...editedItem.columns.file,
						value: fileUrl,
					},
				},
			};

			handleUpdate(newEditedItem);
		} catch (error) {
			console.error("❌ Erreur lors du téléchargement du fichier :", error);
		} finally {
			setUploading(false);
		}
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

							const link = "/cours/" + url + "/" + item.columns[value?.template]?.value;
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
									<FileCpnt item={item.columns[key]} handleDelete={handleDelete} handleFileUpload={handleFileUpload} />
								</td >
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

			{
				isDateModalOpen && (
					<DateModal
						isOpen={isDateModalOpen}
						onClose={() => setIsDateModalOpen(false)}
						initialDates={{
							start: new Date(editedItem.columns[currentDateColumn]?.start),
							end: new Date(editedItem.columns[currentDateColumn]?.end),
						}}
						onSave={handleSaveDate}
					/>
				)
			}
		</>
	);
};




export default Item;
