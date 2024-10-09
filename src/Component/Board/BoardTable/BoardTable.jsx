import React from 'react';
import { MdAdd } from 'react-icons/md';
import { createTable } from '../../../Redux/BoardReducer';
import { useDispatch } from 'react-redux';


const BoardTable = ({ view, board }) => {


	const dispatch = useDispatch();

	return (
		<div>
			{
				board.content && board.content.map((table) => (
					<div key={table._id} className="board-table">
						{table.title}
					</div>
				))
			}
			<button
				className="btn btn-primary"
				onClick={() => {
					// dispatch(toggleFavoriteBoard(board._id));
					dispatch(createTable(board._id));
				}}
				style={{
					color: "white",
					height: "40px",
					width: "25%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					gap: "10px",
					fontSize: "1.2em",
					border: "none",
					cursor: "pointer",
					"background-color": "var(--background-darker-color)",
				}}
			>
				<MdAdd />
				Ajouter un nouveau groupe
			</button>
		</div>
	);
};

export default BoardTable;
