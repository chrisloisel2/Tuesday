import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilteredItems, updateView } from '../../Redux/BoardReducer';

const FilterModal = ({ close }) => {
	const dispatch = useDispatch();
	const activeBoard = useSelector((state) => state.board.activeBoard);
	const activeView = useSelector((state) => state.board.selectedView);

	const [selectedColumn, setSelectedColumn] = useState('');
	const [selectedOperator, setSelectedOperator] = useState('');
	const [filterValue, setFilterValue] = useState('');

	const handleColumnChange = (e) => setSelectedColumn(e.target.value);
	const handleOperatorChange = (e) => setSelectedOperator(e.target.value);
	const handleValueChange = (e) => setFilterValue(e.target.value);

	const applyFilter = () => {
		dispatch(updateView({ ...activeView, filters: [{ column: selectedColumn, operator: selectedOperator, value: filterValue }] }));
		// dispatch(updateFilteredItems(filteredItems));
	};

	return (
		<div className='options-modal'>
			<div className='filtering'>
				<h2>Filtrer les éléments</h2>
				<div>
					<label>Colonne : </label>
					<select value={selectedColumn} onChange={handleColumnChange}>
						<option value="">Sélectionner une colonne</option>
						{activeBoard &&
							Object.keys(activeBoard.columns).map((key, index) => (
								<option key={index} value={key}>
									{activeBoard.columns[key].value}
								</option>
							))}
					</select>
				</div>
				<div>
					<label>Opérateur : </label>
					<select value={selectedOperator} onChange={handleOperatorChange}>
						<option value="">Sélectionner un opérateur</option>
						<option value="égal">égal</option>
						<option value="contient">contient</option>
						<option value="supérieur">supérieur</option>
						<option value="inférieur">inférieur</option>
					</select>
				</div>
				<div>
					<label>Valeur : </label>
					{activeBoard.columns[selectedColumn]?.type === 'text' && (
						<input type="text" value={filterValue} onChange={handleValueChange} />
					)}
					{activeBoard.columns[selectedColumn]?.type === 'number' && (
						<input type="number" value={filterValue} onChange={handleValueChange} />
					)}
					{activeBoard.columns[selectedColumn]?.type === 'date' && (
						<input type="date" value={filterValue} onChange={handleValueChange} />
					)}
					{activeBoard.columns[selectedColumn]?.type === 'enum' && (
						<select value={filterValue} onChange={handleValueChange}>
							<option value="">Sélectionner une valeur</option>
							{Object.keys(activeBoard.columns[selectedColumn]?.values || {}).map((key, index) => (
								<option key={index} value={key}>
									{key}
								</option>
							))}
						</select>
					)}
					{activeBoard.columns[selectedColumn]?.type === 'formula' && (
						<input type="text" value={filterValue} onChange={handleValueChange} disabled />
					)}
				</div>
				<button onClick={applyFilter}>Appliquer</button>
				<button onClick={close} >annuler</button>
			</div>
		</div>
	);
};

export default FilterModal;
