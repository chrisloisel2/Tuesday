import React, { useState, useMemo, useCallback } from "react";
import { MdAdd, MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { CreateBoard, GetBoard } from "../../Redux/BoardReducer";
import { logout } from "../../Redux/AuthReducer";
import { getViewsFromBoard } from "../../Redux/ViewReducer";

const BoardList = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const activeBoard = useSelector((state) => state.board.activeBoard);
	const boards = useSelector((state) => state.board.board);

	const [modal, setModal] = useState(false);
	const [show, setShow] = useState(false);

	const handleToggleSidebar = useCallback(() => {
		setShow((prev) => !prev);
	}, []);

	const handleBoardClick = useCallback(
		(board) => {
			dispatch(GetBoard(board._id));
			dispatch(getViewsFromBoard(board._id));
		},
		[dispatch]
	);

	const boardButtons = useMemo(() => {
		return boards.map((board) => (
			<button
				key={board._id}
				className={`board-item${activeBoard._id === board._id ? "-active" : ""}`}
				onClick={() => handleBoardClick(board)}
			>
				<p>{board.title}</p>
			</button>
		));
	}, [boards, activeBoard, handleBoardClick]);

	const toggleModal = useCallback(() => {
		setModal((prev) => !prev);
	}, []);

	if (!show) {
		return (
			<button
				className="absolute top-5 left-[1vw] bg-[transparent] rounded-full p-2 m-2 z-10"
				onClick={handleToggleSidebar}
			>
				<MdKeyboardDoubleArrowLeft className="text-white" />
			</button>
		);
	}

	return (
		<>
			<div className="w-[7vw] h-screen flex flex-col items-center justify-between border-r-2 border-r-[#30324e] mr-2">
				{/* Liste des boards */}
				<div className="w-full flex flex-col items-center justify-start gap-2">
					{boardButtons}
					<button
						className="board-item"
						onClick={() => dispatch(CreateBoard({ title: "New Board" }))}
						style={{
							cursor: "pointer",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontSize: "20px",
						}}
					>
						<MdAdd />
					</button>
				</div>

				{/* Utilisateur + Modal */}
				<div className="user-view" onClick={toggleModal}>
					<h3>{user?.name}</h3>
					<img src={user?.avatar} alt="user avatar" />
					{modal && (
						<div className="modal">
							<button
								onClick={() => {
									dispatch(logout());
									localStorage.removeItem("activeBoard");
								}}
							>
								Logout
							</button>
						</div>
					)}
				</div>
			</div>

			{/* Bouton pour rétracter la sidebar */}
			<button
				className="absolute top-5 left-[6vw] bg-[transparent] rounded-full p-2 m-2 z-10"
				onClick={handleToggleSidebar}
			>
				<MdKeyboardDoubleArrowLeft className="text-white" />
			</button>
		</>
	);
};

export default BoardList;
