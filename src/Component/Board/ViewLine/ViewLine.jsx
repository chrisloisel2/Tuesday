import React from 'react';
import PropTypes from 'prop-types';
import { FaCog } from 'react-icons/fa';
import { MdAdd } from 'react-icons/md';
import { RxCross1 } from "react-icons/rx";

const ViewLine = ({ board, setview }) => {
	console.log(board);
	return (
		<div>
			<div className="viewline">
				{
					board.view && board.view.map((view) => (
						<div key={view._id} className="view"
							onClick={() => setview(view)}>
							{view.name}
							<RxCross1
								style={{
									cursor: "pointer",
									paddingLeft: "5px",
								}}
							/>
						</div>
					))
				}
				<button className="btn btn-primary"
					onClick={() => {
						// dispatch(toggleFavoriteBoard(board._id));
					}}
					style={{
						color: "white",
						height: "100%",
						width: "2%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						border: "none",
						cursor: "pointer",
						"background-color": "transparent",
					}}
				>
					<MdAdd />
				</button>
			</div >

			<div className="View-line">
				<button>
					<MdAdd />
					Ajouter un élément
				</button>
				<input type="text" placeholder="Rechercher" />
			</div>
		</div>

	);
};

ViewLine.propTypes = {
	data: PropTypes.array.isRequired,
};

export default ViewLine;
