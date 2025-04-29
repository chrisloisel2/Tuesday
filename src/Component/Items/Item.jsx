import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditableCell from './EditableCell';
import EnumCell from './EnumCell';
import DateCell from './DateCell';
import FormulaCell from './FormulaCell';
import FileCpnt from './FileModal';
import DateModal from '../DateModal/DateModal';
import { selectItem, updateItem } from '../../Redux/ItemReducer';
import MyAxios from '../../Interceptor/MyAxios';
import './Item.css';

const doesItemMatchFilters = (item, filters, columns, cells) => {
	if (!filters || filters.length === 0) return false;

	return filters.every(filter => {
		const column = columns.find(col => col._id === filter.column);

		const itemValue = cells[`${item._id}-${filter.column}`]?.value.label;
		const filterValue = columns.find(col => col._id === filter.column)?.possibleValues[filter.value]?.label;

		switch (filter.operator) {
			case 'égal':
				console.log("equal", itemValue, filterValue);
				return itemValue === filterValue;
			case 'différent':
				console.log("itemValue", itemValue, "filterValue", filterValue, "result", itemValue !== filterValue);
				return itemValue !== filterValue;
			case 'contient':
				return typeof itemValue === 'string' && itemValue.includes(filter.value);
			case 'supérieur':
				return !isNaN(itemValue) && !isNaN(filter.value) && Number(itemValue) > Number(filter.value);
			case 'inférieur':
				return !isNaN(itemValue) && !isNaN(filter.value) && Number(itemValue) < Number(filter.value);
			default:
				console.log("default", itemValue, filterValue);
				return false;
		}
	});
};

const Item = ({ itemId, color, columns }) => {
	const item = useSelector((state) => state.items.items[itemId]);
	const view = useSelector((state) => state.view.selectedView);
	const dispatch = useDispatch();
	const cells = useSelector((state) => state.cell.cells);

	const [editedItem, setEditedItem] = useState(item);
	const [activeEnumColumn, setActiveEnumColumn] = useState(null);
	const [isDateModalOpen, setIsDateModalOpen] = useState(false);
	const [currentDateColumn, setCurrentDateColumn] = useState(null);
	const [uploading, setUploading] = useState(false);
	const selectedItems = useSelector((state) => state.items.selectedItems);


	if (!item) return <div>Loading...</div>;

	if (doesItemMatchFilters(item, view.filters, columns, cells)) {
		return null;
	}

	const handleDelete = (columnKey) => {
		const newEditedItem = {
			...editedItem,
			columns: editedItem.columns.filter((column) => column.key !== columnKey),
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

	const handleFileUpload = async (file, columnKey) => {
		const formData = new FormData();
		formData.append("file", file);

		try {
			setUploading(true);
			const response = await MyAxios.post("/item/upload", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			const fileUrl = response.fileUrl;

			const newEditedItem = {
				...editedItem,
				columns: [
					...editedItem.columns.filter((column) => column.key !== columnKey),
					{ key: columnKey, value: fileUrl },
				],
			};

			handleUpdate(newEditedItem);
		} catch (error) {
			console.error("❌ Erreur upload fichier :", error);
		} finally {
			setUploading(false);
		}
	};

	const handleSaveDate = (newDates) => {
		const newEditedItem = {
			...editedItem,
			columns: [
				...editedItem.columns.filter((column) => column.key !== currentDateColumn),
				{
					key: currentDateColumn,
					start: newDates.start.toISOString(),
					end: newDates.end.toISOString(),
				},
			],
		};
		handleUpdate(newEditedItem);
		setIsDateModalOpen(false);
	};

	return (
		<tr key={item} className={selectedItems.includes(item) ? "selected" : ""}>
			<td>
				<input
					type="checkbox"
					onChange={() => dispatch(selectItem(item))}
					checked={selectedItems.includes(item)}
				/>
			</td>
			{
				[...columns]
					.sort((a, b) => {
						const order = view.orderColumns || [];
						return order.indexOf(a._id) - order.indexOf(b._id);
					})
					.filter(column => !view.hiddenColumns?.includes(column._id))
					.map((value) => {
						switch (value.type) {
							case 'date':
								return (
									<DateCell
										key={value._id}
										columnKey={value._id}
										itemId={item._id}
										color={color}
										openDateModal={() => openDateModal(value._id)}
									/>
								);
							case 'enum':
								return (
									<EnumCell
										key={value._id}
										columnKey={value._id}
										item={item}
										activeEnumColumn={activeEnumColumn}
										setActiveEnumColumn={setActiveEnumColumn}
										handleUpdate={handleUpdate}
									/>
								);
							case 'diapo':
								const url = item.columns[value?.diapo]?.value?.split('/')[4];
								const link = `/cours/${url}/${item.columns[value?.template]?.value}`;
								return (
									<td key={value._id}>
										{url ? (
											<a href={link} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
												cliquer ici
											</a>
										) : null}
									</td>
								);
							case 'formula':
								return (
									<FormulaCell
										key={value._id}
										columnKey={value._id}
										item={item}
										columns={columns}
										handleDelete={handleDelete}
										handleUpdate={handleUpdate}
									/>
								);
							case 'file':
								return (
									<td key={value._id}>
										<FileCpnt item={item} columnId={value._id} />
									</td>
								);
							default:
								return (
									<EditableCell
										key={value._id}
										columnKey={value._id}
										itemId={item._id}
									/>
								);
						}
					})
			}

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
			<th></th>

		</tr>
	);
};

export default Item;
