import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { creteView, deleteView, GetBoards, SelectedView, } from '../../Redux/BoardReducer';
import FilterModal from './FilterModal';
import OrderModal from './OrderModal';
import HideModal from './HideModal';
import { AiOutlineEllipsis } from "react-icons/ai";
import './ViewList.css';

const ViewList = () => {
	const dispatch = useDispatch();
	const activeBoard = useSelector((state) => state.board.activeBoard);
	const activeVew = useSelector((state) => state.board.selectedView);
	const [modal, setModal] = useState(false);
	const [filterModal, setFilterModal] = useState(false);
	const [orderModal, setOrderModal] = useState(false);
	const [hideModal, setHideModal] = useState(false);
	const [optionsModal, setOptionsModal] = useState(false); // Modale pour modification/suppression

	useEffect(() => {
		console.log("activeVew", activeVew);
	})

	const handleAdd = () => {
		dispatch(
			creteView({
				name: "newView",
				type: "table",
				BoardId: activeBoard._id
			})
		);
		dispatch(GetBoards());
	}

	const handleOptionsModal = (view) => {
		console.log("View selected --->", activeVew);
		setOptionsModal(!optionsModal);
	}

	const handleDelete = () => {
		console.log("Delete view --->", activeVew);
		dispatch(deleteView(activeVew._id));
		setOptionsModal(!optionsModal);
	}

	return (
		<div className="view-list">
			<div className="view-switcher">
				{activeBoard.view?.map((item, index) => (
					<div
						key={index}
						className={activeVew?._id === item._id ? "view active" : "view"}
						onClick={() => dispatch(SelectedView(item))}
					>
						{item.name}
						{activeVew?._id === item._id && (
							<AiOutlineEllipsis
								onClick={() => handleOptionsModal(item)}
								className="ellipsis-icon"
							/>
						)}
					</div>
				))}
				<button onClick={handleAdd}>+</button>
			</div>
			{optionsModal && (
				<div className="options-modal">
					<button onClick={() => handleDelete()}>Modify</button>
					<button onClick={() => handleDelete()}>Delete</button>
				</div>
			)
			}
			<hr />
			{
				activeVew && (
					<div className="view-content">
						<input type="text" />
						<button
							onClick={() => setFilterModal(!filterModal)}
							className={filterModal ? "active" : ""}
						>Filter</button>
						{filterModal && <FilterModal />}
						<button onClick={() => setOrderModal(!orderModal)}>Order</button>
						{orderModal && <OrderModal />}
						<button onClick={() => setHideModal(!hideModal)}>Hide</button>
						{hideModal && <HideModal close={() => setHideModal(!hideModal)} />}
					</div>
				)
			}
		</div >
	);
};

export default ViewList;
