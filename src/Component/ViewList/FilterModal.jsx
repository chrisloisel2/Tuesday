import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateView } from '../../Redux/ViewReducer';

const defaultColors = [
	'red', 'blue', 'green', 'purple', 'orange', 'pink', 'teal', 'invisible'
];

const FilterModal = ({ close }) => {
	const dispatch = useDispatch();
	const activeBoard = useSelector((state) => state.board.activeBoard);
	const activeView = useSelector((state) => state.view.selectedView);

	const [filters, setFilters] = useState(activeView?.filters || []);

	const addFilter = () => {
		setFilters([
			...filters,
			{ column: '', operator: '', value: '', color: 'invisible' }
		]);
	};

	const updateFilter = (index, key, value) => {
		const newFilters = [...filters];
		newFilters[index][key] = value;
		setFilters(newFilters);
	};

	const removeFilter = (index) => {
		const newFilters = [...filters];
		newFilters.splice(index, 1);
		setFilters(newFilters);
	};

	const applyFilters = () => {
		dispatch(updateView({ ...activeView, filters }));
		close();
	};

	const getColumnType = (columnId) => {
		return activeBoard?.columns?.find((col) => col._id === columnId)?.type;
	};

	const getColumnOptions = (columnId) => {
		return activeBoard?.columns?.find((col) => col._id === columnId)?.possibleValues || {};
	};

	return (
		<div className="options-modal">
			<div className="filtering">
				<h2>Gestion des Filtres</h2>
				{filters.map((filter, index) => (
					<div key={index} className="filter-item" style={{ borderLeft: `4px solid ${filter.color !== 'invisible' ? filter.color : 'transparent'}`, paddingLeft: '8px', marginBottom: '12px' }}>
						<div>
							<label>Colonne : </label>
							<select value={filter.column} onChange={(e) => updateFilter(index, 'column', e.target.value)}>
								<option value="">-- Sélectionner --</option>
								{activeBoard && activeBoard.columns.map((col) => (
									<option key={col._id} value={col._id}>{col.name}</option>
								))}
							</select>
						</div>

						<div>
							<label>Opérateur : </label>
							<select value={filter.operator} onChange={(e) => updateFilter(index, 'operator', e.target.value)}>
								<option value="">-- Sélectionner --</option>
								<option value="egal">égal</option>
								<option value="différent">différent</option>
								<option value="contient">contient</option>
								<option value="sup">supérieur</option>
								<option value="inf">inférieur</option>
							</select>
						</div>

						<div>
							<label>Valeur : </label>
							{getColumnType(filter.column) === 'text' && (
								<input type="text" value={filter.value} onChange={(e) => updateFilter(index, 'value', e.target.value)} />
							)}
							{getColumnType(filter.column) === 'number' && (
								<input type="number" value={filter.value} onChange={(e) => updateFilter(index, 'value', e.target.value)} />
							)}
							{getColumnType(filter.column) === 'date' && (
								<input type="date" value={filter.value} onChange={(e) => updateFilter(index, 'value', e.target.value)} />
							)}
							{getColumnType(filter.column) === 'enum' && (
								<select value={filter.value} onChange={(e) => updateFilter(index, 'value', e.target.value)}>
									<option value="">-- Choisir --</option>
									{Object.entries(getColumnOptions(filter.column)).map(([key, val]) => (
										<option key={key} value={key}>{val.label}</option>
									))}
								</select>
							)}
						</div>

						<div>
							<label>Couleur : </label>
							<select value={filter.color} onChange={(e) => updateFilter(index, 'color', e.target.value)}>
								{defaultColors.map((color, idx) => (
									<option key={idx} value={color}>{color}</option>
								))}
							</select>
						</div>

						<button onClick={() => removeFilter(index)} style={{ marginTop: '5px', backgroundColor: 'tomato', color: 'white' }}>Supprimer</button>
					</div>
				))}

				<div className="actions">
					<button onClick={addFilter}>Ajouter un filtre</button>
					<button onClick={applyFilters}>Appliquer</button>
					<button onClick={close}>Annuler</button>
				</div>
			</div>
		</div>
	);
};

export default FilterModal;
