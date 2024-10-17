import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { creteView } from '../../Redux/BoardReducer';

const ViewList = ({ views, change, activeVew }) => {
	const dispatch = useDispatch();
	const [modal, setModal] = useState(false);

	return (
		<div>
			<div className="view-switcher">
				{views?.view?.map((item, index) => (
					<div key={index}>
						<button
							className={activeVew?._id === item._id ? "active" : ""}
							onClick={() => change(item)}
						>
							{item.name}
						</button>
					</div>
				))}
				<button
					onClick={() => dispatch(
						creteView({
							name: "newView",
							type: "table",
							BoardId: views._id
						})
					)}
				>
					+
					{
						modal &&
						<div className="modal">
							<input type="text" />
							<button>Valider</button>
						</div>
					}
				</button>
			</div >
			{
				views?.type === "table" &&
				(
					<div className="view-switcher">
						<button onClick={() => setModal(!modal)}>Ajouter une vue</button>
					</div>
				)
			}

		</div>
	);
};

export default ViewList;
