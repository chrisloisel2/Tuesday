import React, { useState } from "react";

const ColumnCreatorModal = ({ handleColumnCreate, setCreateModal, columns }) => {
	const [stage, setStage] = useState(0);
	const [column, setColumn] = useState({});
	const [formulaExpression, setFormulaExpression] = useState("");
	const [selectedOperation, setSelectedOperation] = useState(null);
	const [error, setError] = useState("");

	const handlenext = (data) => {
		setColumn(data);
		setStage(stage + 1);
	};

	// Ajouter une colonne ou une valeur au calcul
	const handleAddToFormula = (value) => {
		setFormulaExpression((prev) => prev + value);
		setError(""); // Réinitialiser les erreurs lors de l'ajout
	};

	// Ajouter une opération
	const handleAddOperation = (operation) => {
		if (!selectedOperation) {
			setFormulaExpression((prev) => prev + ` ${operation} `);
			setSelectedOperation(operation);
		} else {
			setError("Une opération est déjà en cours");
		}
	};

	// Supprimer la dernière partie de la formule
	const handleRemoveLast = () => {
		setFormulaExpression((prev) => prev.slice(0, -1));
	};

	// Valider et créer la formule
	const handleCreateFormula = () => {
		// Vérification basique
		if (!formulaExpression) {
			setError("La formule ne peut pas être vide");
			return;
		}
		// Créer la colonne avec la formule
		handleColumnCreate({ ...column, formula: formulaExpression });
		setCreateModal(false);
	};

	return (
		<div className="modal">
			{stage === 0 && (
				<div className="modal-column-content">
					<button onClick={() => handlenext({ type: "text", show: "none" })}>Text</button>
					<button onClick={() => handlenext({ type: "text", show: "none" })}>ID</button>
					<button onClick={() => handlenext({ type: "number", show: "summ" })}>Number</button>
					<button onClick={() => handlenext({ type: "date", show: "minmax" })}>Date</button>
					<button onClick={() => handlenext({ type: "enum", show: "concat", values: { Default: "#fffff" } })}>Enum</button>
					<button onClick={() => handlenext({ type: "file", show: "none" })}>File</button>
					<button onClick={() => handlenext({ type: "checkbox", show: "none" })}>Checkbox</button>
					<button onClick={() => handlenext({ type: "formula", show: "none" })}>Formula</button>
					<button onClick={() => setCreateModal(false)}>Cancel</button>
				</div>
			)}

			{stage === 1 && column.type === "formula" && (
				<div className="modal-column-content">
					<h2>Construct Formula</h2>
					<div>
						{Object.keys(columns).map((key, value) => (
							<button onClick={() => handleAddToFormula(key)}>{columns[key].value}</button>
						))}
						<button onClick={() => handleAddToFormula("(")}>(</button>
						<button onClick={() => handleAddToFormula(")")}>)</button>
						<input
							type="number"
							placeholder="Add a static value"
							onChange={(e) => handleAddToFormula(e.target.value)}
						/>
					</div>
					<div>
						<button onClick={() => handleAddOperation("+")}>+</button>
						<button onClick={() => handleAddOperation("-")}>-</button>
						<button onClick={() => handleAddOperation("*")}>*</button>
						<button onClick={() => handleAddOperation("/")}>/</button>
					</div>
					<div>
						<h3>Formula Preview:</h3>
						<p>{formulaExpression}</p>
					</div>
					{error && <p style={{ color: "red" }}>{error}</p>}
					<button onClick={handleRemoveLast}>Remove Last</button>
					<button onClick={() => setStage(0)}>Back</button>
					<button onClick={handleCreateFormula}>Create Formula</button>
				</div>
			)}

			{stage === 1 && column.type !== "formula" && (
				<div className="modal-column-content">
					<h2>Column Type: {column.type}</h2>
					<h2>Column Name</h2>
					<input
						type="text"
						onChange={(e) => setColumn({ ...column, value: e.target.value })}
					/>
					<button onClick={() => setStage(0)}>Back</button>
					<button
						onClick={() => {
							handleColumnCreate(column);
							setCreateModal(false);
						}
						}
					>
						Create Column
					</button>
				</div>
			)}

			{stage === 2 && (
				<div className="modal-column-content">
					<h2>Column Name</h2>
					<input
						type="text"
						onChange={(e) => setColumn({ ...column, title: e.target.value })}
					/>
					<button onClick={() => setStage(1)}>Back</button>
					<button
						onClick={() => {
							handleColumnCreate({ ...column, formulaExpression });
							setCreateModal(false);
						}}
					>
						Create Column
					</button>
				</div>
			)}
		</div>
	);
};

export default ColumnCreatorModal;
