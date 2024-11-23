import React from 'react';
import { FaFileAlt } from "react-icons/fa";
import DateRangeBadge from '../DateRangeBadge/DateRangeBadge';

const renderText = (items, key, value) => {
	switch (value.show) {
		case "none":
			return null;
		default:
			return (
				<td key={key}>
					{
						Object.keys(items).map((item, index) => {
							if (items[item].column == key) {
								return (
									<div key={index} style={{ color: items[item].color }}>
										{items[item].value}
									</div>
								);
							}
						}
						)
					}
				</td>
			);
	}
}

const renderDate = (items, key, value, table) => {

	if (value.show === "none") {
		return null;
	}

	switch (value.show) {
		case "minmax":
			let min = new Date(items?.length > 0 ? items[0].columns[key].start : new Date());
			let max = new Date(items?.length > 0 ? items[0].columns[key].end : new Date());

			items?.map((item, index) => {
				if (item.columns[key] !== undefined) {
					if (new Date(item.columns[key].start) < min) {
						min = new Date(item.columns[key].start);
						max = new Date(item.columns[key].end);
					}
					if (new Date(item.columns[key].end) > max) {
						max = new Date(item.columns[key].end);
					}
				}
			});

			if (min == max) {
				return (
					<p>
						no date
					</p>
				)
			}

			return (
				<DateRangeBadge startDate={min} endDate={max} color={table.color} />
			);
		default:
			return null;
	}
}

const renderNumber = (items, key, value) => {
	switch (value.show) {
		case "summ":
			let sum = 0;

			items?.map((item, index) => {
				if (item.columns[key] !== undefined) {
					sum += Number(item.columns[key].value);
				}
			});

			return (sum);

		case "average":
			let avgSum = 0;
			let count = 0;

			Object.keys(items).map((item, index) => {
				if (items[item].column == key) {
					avgSum += items[item].value;
					count += 1;
				}
			});

			return (avgSum / count);

		case "min":
			let min = Infinity;

			Object.keys(items).map((item, index) => {
				if (items[item].column == key) {
					if (items[item].value < min) {
						min = items[item].value;
					}
				}
			});

			return (min);

		case "max":
			let max = -Infinity;

			Object.keys(items).map((item, index) => {
				if (items[item].column == key) {
					if (items[item].value > max) {
						max = items[item].value;
					}
				}
			});

			return (max);

		case "mean":
			let meanSum = 0;
			let meanCount = 0;

			items?.map((item, index) => {
				if (item.columns[key] !== undefined) {
					meanSum += Number(item.columns[key].value);
					meanCount += 1;
				}
			});

			return (
				(meanSum / meanCount).toFixed(0)
			);

		default:
			return null;
	}
}



const renderEnum = (items, key, value, columns) => {
	switch (value.show) {
		case "concat":
			let map = {};

			// Créer une map des valeurs
			items?.forEach((item) => {
				if (item?.columns[key] !== undefined) {
					const val = item.columns[key].value;
					if (map[val]) {
						map[val] += 1;
					} else {
						map[val] = 1;
					}
				}
			});

			// Calculer le pourcentage de chaque valeur
			Object.keys(map).forEach((val) => {
				map[val] = `${map[val]} (${((map[val] / items.length) * 100).toFixed(0)}%)`;
			});


			return (
				<div style={{ display: "flex", width: "100%" }}>
					{Object.keys(map).map((val, index) => {
						// Vérifier que la largeur est correcte
						const width = map[val] && map[val].split(" ")[1]
							? `${map[val].split(" ")[1].slice(1, -2)}%`
							: "50px"; // valeur par défaut si problème

						return (
							<div
								key={index}
								style={{
									backgroundColor: columns[key]?.values[val] || "gray", // Ajouter une couleur par défaut
									width: width,
									height: "20px",
								}}
							/>
						);
					})}
				</div>
			);
		default:
			return null;
	}
};

const renderFormula = (items, key, value, columns) => {
	switch (value.show) {
		case "summ":
			let sum = 0;

			items?.forEach((item) => {
				const formula = columns[key]?.formula;
				if (formula) {
					// Remplace chaque référence de colonne dans la formule par la valeur de l'élément correspondant
					const formulaValue = formula.replace(/\b([a-zA-Z0-9_]+)\b/g, (match) => {
						return item.columns[match]?.value || 0;
					});

					try {
						// Évalue la formule et ajoute le résultat à la somme totale
						const result = eval(formulaValue);
						sum += result;
					} catch (error) {
						console.error("Erreur de calcul de la formule :", error);
					}
				}
			});
			if (isNaN(sum)) {
				return "Error";
			}
			return Number(sum).toLocaleString('fr-FR');



		default:
			return (
				<td key={key}>
					{Object.keys(items).map((item, index) => {
						if (items[item].column === key) {
							return (
								<div key={index} style={{ color: items[item].color }}>
									{
										items[item].value
									}
								</div>
							);
						}
						return null;
					})}
				</td>
			);
	}
};



export { renderText, renderDate, renderNumber, renderEnum, renderFormula };
