import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateView } from '../../Redux/ViewReducer';

function OrderedCardList({ order, setOrder }) {


	const handleOrderChange = (id, newIndex) => {
		const index = order.findIndex((item) => item._id === id);
		if (index === -1) return;

		newIndex = Math.max(1, Math.min(newIndex, order.length)) - 1;

		const updated = [...order];
		const [movedItem] = updated.splice(index, 1);
		updated.splice(newIndex, 0, movedItem);

		setOrder(updated);
	};

	return (
		<div>
			<h2>Liste des colonnes</h2>
			<div style={{ display: "flex", flexDirection: "row", gap: "1rem", overflowX: "auto" }}>
				{order.map((item, index) => (
					<div
						key={item.id}
						style={{
							background: "white",
							border: "1px solid #ccc",
							borderRadius: "8px",
							padding: "1rem",
							minWidth: "150px",
							boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
							textAlign: "center",
						}}
					>
						<div>{item.name}</div>
						<div style={{ marginTop: "0.5rem" }}>
							<label>
								<input
									type="number"
									min={1}
									max={order.length}
									value={index + 1}
									onChange={(e) =>
										handleOrderChange(item._id, parseInt(e.target.value, 10))
									}
									style={{ width: "50px", textAlign: "center" }}
								/>
							</label>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

const orderBy = (a, b, type = "asc") => {
	if (!a || !b) return 0;

	let aVal = a.value;
	let bVal = b.value;

	if (type === "date") {
		aVal = new Date(aVal.start);
		bVal = new Date(bVal.start);
	}

	if (type === "alphabetical") {
		aVal = aVal?.toString().toLowerCase();
		bVal = bVal?.toString().toLowerCase();
	}

	if (aVal < bVal) return type === "desc" ? 1 : -1;
	if (aVal > bVal) return type === "desc" ? -1 : 1;
	return 0;
};


const OrderModal = ({ setModal }) => {

	const creteView = () => { }
	const dispatch = useDispatch();
	const view = useSelector((state) => state.view.selectedView);
	const activeBoard = useSelector((state) => state.board.activeBoard);
	const activeView = useSelector((state) => state.view.selectedView);


	console.log("activeView", activeView.orderColumns);
	const values = activeView.orderColumns.length > 0 ? activeView.orderColumns.map((item) => {
		const column = activeBoard?.columns.find((col) => col._id === item);
		if (column.name === undefined) {
			return {
				_id: item,
				name: activeBoard?.columns.find((col) => col._id === item)?.name,
				value: activeBoard?.columns.find((col) => col._id === item)?.value,
			};
		}
		return {
			_id: item,
			name: column.name,
			value: column.value,
		};
	}) : activeBoard?.columns.map((column) => {
		return {
			_id: column._id,
			name: column.name,
			value: column.value,
		};
	})

	const [order, setOrder] = useState(values);
	console.log("oder of ", order, view);
	const actions = [
		{ name: "Croissant", value: "asc" },
		{ name: "Décroissant", value: "desc" },
		{ name: "Valeur", value: "value" },
		{ name: "Date", value: "date" },
		{ name: "Alphabetique", value: "alphabetical" },
		{ name: "Personnalisé", value: "custom" },
	]

	return (
		<div className='modal w-[60vw]'>
			<h1 className='text-2xl font-bold p-14'>Trier par</h1>
			<div className='flex flex-col gap-8 p-4'>
				<div className='flex flex-row gap-2'>
					<label className='text-lg font-bold'>
						Colonne
					</label>
					<select
						value={order[0]}
						className='select p-2'
						onChange={(e) => {
							setOrder((prev) => {
								const newOrder = [...prev];
								newOrder[0] = e.target.value;
								return newOrder;
							});
						}}
					>
						<option value=''>Aucun</option>
						{activeBoard?.columns.map((column) => (
							<option key={column._id} value={column._id}>
								{column.name}
							</option>
						))}
					</select>
				</div>
				<div className='flex flex-row gap-2'>
					<label className='text-lg font-bold'>
						Trier par
					</label>
					<select
						onChange={(e) => {
							setOrder((prev) => {
								const newOrder = [...prev];
								newOrder[1] = e.target.value;
								return newOrder;
							});
						}}
						value={order[1]}
						className='select  p-2'
					>
						<option value=''>Aucun</option>
						{actions.map((action) => (
							<option key={action.value} value={action.value}>
								{action.name}
							</option>
						))}
					</select>
				</div>
				<OrderedCardList
					order={order}
					setOrder={setOrder}
				/>
				<button
					className="text-lg !text-[black]"
					onClick={() => {
						dispatch(updateView({ _id: view._id, orderColumns: order }));
						setModal(false);
					}}
				>
					Valider
				</button>
				<button
					className="text-lg !text-[black]"
					onClick={() => {
						setModal(false);
					}}
				>
					Annuler
				</button>
			</div>
		</div>
	);
};

export default OrderModal;
export { orderBy };
