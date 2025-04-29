import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createColumn } from "../../Redux/BoardReducer";

const ColumnCreatorModal = ({ setCreateModal }) => {
	const columns = useSelector((state) => state.board.activeBoard.columns);
	const dispatch = useDispatch();
	const activeBoard = useSelector((state) => state.board.activeBoard);

	const [stage, setStage] = useState(0);
	const [column, setColumn] = useState({
		name: "",
		type: "",
		width: 200,
		resume: "Default",
		possibleValues: [],
		relation: { collection: "", displayField: "" }
	});
	const [formulaExpression, setFormulaExpression] = useState("");
	const [selectedOperation, setSelectedOperation] = useState(null);
	const [error, setError] = useState("");
	const [diapoExpression, setDiapoExpression] = useState("");
	const [diapoTemplate, setDiapoTemplate] = useState("");

	const handleColumnCreate = (newColumn) => {
		dispatch(
			createColumn({
				id: activeBoard?._id,
				data: newColumn
			})
		);
		setCreateModal(false);
	};

	const handleNext = (data) => {
		setColumn({ ...column, ...data });
		setStage(stage + 1);
	};

	const handleCreateFormula = () => {
		if (!formulaExpression) {
			setError("La formule ne peut pas être vide");
			return;
		}
		handleColumnCreate({ ...column, formula: formulaExpression });
	};

	const handleAddToFormula = (value) => {
		setFormulaExpression((prev) => prev + value);
		setError("");
	};

	const handleAddOperation = (operation) => {
		if (!selectedOperation) {
			setFormulaExpression((prev) => prev + ` ${operation} `);
			setSelectedOperation(operation);
		} else {
			setError("Une opération est déjà en cours");
		}
	};

	const handleRemoveLast = () => {
		setFormulaExpression((prev) => prev.slice(0, -1));
	};

	return (
		<div className="modal">
			{stage === 0 && (
				<div className="modal-column-content">
					<button onClick={() => handleNext({ type: "text" })}>Text</button>
					<button onClick={() => handleNext({ type: "number", resume: "summ" })}>Number</button>
					<button onClick={() => handleNext({ type: "date", resume: "minmax" })}>Date</button>
					<button onClick={() => handleNext({ type: "file" })}>File</button>
					<button onClick={() => handleNext({ type: "enum", resume: "concat", possibleValues: [{ value: "Default", color: "#ffffff" }] })}>Enum</button>
					<button onClick={() => handleNext({ type: "relation", resume: "none", relation: { collection: "", displayField: "" } })}>Relation</button>
					<button onClick={() => handleNext({ type: "formula", resume: "none" })}>Formula</button>
					<button onClick={() => handleNext({ type: "diapo", resume: "none" })}>Diapo</button>
					<button onClick={() => setCreateModal(false)}>Cancel</button>
				</div>
			)}

			{stage === 1 && column.type === "formula" && (
				<div className="modal-column-content">
					<h2>Construire une formule</h2>
					<div>
						{columns.map((column) => (
							<button onClick={() => handleAddToFormula(column._id)}>{column.name}</button>
						))}
						<button onClick={() => handleAddToFormula("(")}>(</button>
						<button onClick={() => handleAddToFormula(")")}>)</button>
						<input type="number" placeholder="Ajouter une valeur" onChange={(e) => handleAddToFormula(e.target.value)} />
					</div>
					<div>
						<button onClick={() => handleAddOperation("+")}>+</button>
						<button onClick={() => handleAddOperation("-")}>-</button>
						<button onClick={() => handleAddOperation("*")}>*</button>
						<button onClick={() => handleAddOperation("/")}>/</button>
					</div>
					<div>
						<h3>Prévisualisation de la formule :</h3>
						<p>{formulaExpression}</p>
					</div>
					<input
						type="text"
						placeholder="Nom de la colonne"
						value={column.name}
						onChange={(e) => setColumn({ ...column, name: e.target.value })}
					/>
					{error && <p style={{ color: "red" }}>{error}</p>}
					<button onClick={handleRemoveLast}>Supprimer le dernier</button>
					<button onClick={() => setStage(0)}>Retour</button>
					<button onClick={handleCreateFormula}>Créer la formule</button>
				</div>
			)}

			{stage === 1 && column.type === "relation" && (
				<div className="modal-column-content">
					<h2>Configurer une relation</h2>
					<input type="text" placeholder="Nom de la collection" onChange={(e) => setColumn({ ...column, relation: { ...column.relation, collection: e.target.value } })} />
					<input type="text" placeholder="Champ d'affichage" onChange={(e) => setColumn({ ...column, relation: { ...column.relation, displayField: e.target.value } })} />
					<button onClick={() => setStage(0)}>Retour</button>
					<button onClick={() => handleColumnCreate(column)}>Créer la colonne</button>
				</div>
			)}

			{stage === 1 && column.type !== "formula" && column.type !== "relation" && (
				<div className="modal-column-content">
					<h2>Nom de la colonne</h2>
					<input type="text" onChange={(e) => setColumn({ ...column, name: e.target.value })} />
					<button onClick={() => setStage(0)}>Retour</button>
					<button onClick={() => handleColumnCreate(column)}>Créer la colonne</button>
				</div>
			)}
		</div>
	);
};

export default ColumnCreatorModal;
