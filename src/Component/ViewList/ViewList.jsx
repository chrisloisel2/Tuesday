import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	creteView,
	deleteView,
	selectedView,
	updateView,
	updateViewSharing,
} from '../../Redux/ViewReducer';
import FilterModal from './FilterModal';
import OrderModal from './OrderModal';
import HideModal from './HideModal';
import './ViewList.css';
import { getAllUsers } from '../../Redux/UserReducer';
import { AiOutlineEllipsis } from 'react-icons/ai';

const ViewList = () => {
	const dispatch = useDispatch();
	const users = useSelector((state) => state.users.users);
	const user = useSelector((state) => state.auth.user);
	const activeBoard = useSelector((state) => state.board.activeBoard);
	const activeView = useSelector((state) => state.view.selectedView);
	const views = useSelector((state) => state.view.viewList);

	const [viewName, setViewName] = useState(activeView?.name);
	const [filterModal, setFilterModal] = useState(false);
	const [orderModal, setOrderModal] = useState(false);
	const [hideModal, setHideModal] = useState(false);
	const [optionsModal, setOptionsModal] = useState(false);

	useEffect(() => {
		dispatch(getAllUsers());
	}, [dispatch, activeView]);

	const handleAdd = () => {
		dispatch(
			creteView({
				name: "newView",
				type: "table",
				BoardId: activeBoard?._id,
				owner: [user._id]
			})
		);
	};

	const handleOptionsModal = () => {
		setOptionsModal(!optionsModal);
	};

	const handleDelete = () => {
		if (activeView?._id) {
			dispatch(deleteView(activeView._id));
			setOptionsModal(false);
		}
	};

	const toggleShare = (userId) => {
		if (!activeView) return;

		const isShared = activeView.sharedWith?.includes(userId);

		dispatch(
			updateViewSharing({
				...activeView,
				userId,
				action: isShared ? "unshare" : "share",
			})
		);
	};

	return (
		<div className="view-list pl-5">
			<div className="view-switcher">
				{views?.
					filter((item) => {
						return (
							item.owner?.includes(user._id) ||
							item.sharedWith?.includes(user._id) ||
							user.role == "admin"
						);
					}).
					map((item) => (
						<div
							key={item._id}
							className={activeView?._id === item._id ? "view-active" : "view"}
							onClick={() => dispatch(selectedView(item))}
						>
							{item.name}
							{activeView?._id === item._id && (
								<AiOutlineEllipsis
									onClick={(e) => {
										e.stopPropagation();
										handleOptionsModal();
									}}
									className="ellipsis-icon"
								/>
							)}
						</div>
					))}
				<button onClick={handleAdd}>+</button>
			</div>


			{optionsModal && (
				<div className="options-modal">
					<h3>Options</h3>
					<p>Changer le nom : <input type="text" placeholder="Rename view" onChange={
						(e) => setViewName(e.target.value)
					} value={viewName} /><input type='button' value="valider" onClick={
						() => {
							dispatch(updateView({ _id: activeView._id, name: viewName }));
						}
					} /></p>

					<div className="shared-users">
						{users.map((user) => (
							<div key={user._id} className="user-item">
								<input
									type="checkbox"
									checked={activeView?.sharedWith?.includes(user._id) || false}
									onChange={() => toggleShare(user._id)}
								/>

								<nobr>{user.name[0].toUpperCase() + user.name.slice(1)}</nobr>
							</div>
						))}
					</div>
					<div className="modal-actions">
						<button onClick={handleDelete}>Delete</button>
						<button onClick={() => setOptionsModal(false)}>Close</button>
					</div>
				</div>
			)}

			<hr />

			{activeView && (activeView.owner.includes(user._id)
				|| user.role == "admin")
				&& (
					<div className="view-content">
						<input type="text" placeholder="Search or filter..." />
						<button
							onClick={() => setFilterModal(!filterModal)}
							className={filterModal ? "active" : ""}
						>
							Filter
						</button>
						{filterModal && <FilterModal close={() => setFilterModal(false)} />}
						<button onClick={() => setOrderModal(!orderModal)}>Order</button>
						{orderModal && <OrderModal setModal={setOrderModal} />}
						<button onClick={() => setHideModal(!hideModal)}>Hide</button>
						{hideModal && <HideModal close={() => setHideModal(false)} />}
					</div>
				)
			}
		</div >
	);
};

export default ViewList;
