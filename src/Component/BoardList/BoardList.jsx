import React, { useEffect, useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import FormationBoard from "../Boards/Board";
import { useDispatch, useSelector } from "react-redux";
import { CreateBoard, GetBoard, selectBoard } from "../../Redux/BoardReducer";
import { logout } from "../../Redux/AuthReducer";

const BoardList = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const activeBoard = useSelector((state) => state.board.activeBoard);
	const boards = useSelector((state) => state.board.board);
	const [modal, setModal] = useState(false);

	return (
		<>
			<div className="board-list-container">
				<div className="menu">
					{boards.map((board, index) => (
						<button
							key={board._id}
							className={`board-item${activeBoard === index ? "-active" : ""}`}
							onClick={() => dispatch(GetBoard(board._id))}
						>
							<IoDocumentTextOutline
								style={{
									fontSize: "20px",
									marginRight: "10px",
								}}
							/>
							<p>{board.title}</p>
						</button>
					))}
					<button
						className="board-item"
						style={{
							cursor: "pointer",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontSize: "20px",
						}}
					>
						<MdAdd onClick={() => dispatch(CreateBoard(
							{
								title: "New Board",
							}
						))} />
					</button>
				</div>
				<div className="user-view" onClick={() => setModal(!modal)}>
					<h3>{user?.name}</h3>
					<img src={user?.avatar} alt="user" />
					{
						modal && (
							<div className="modal">
								<button
									onClick={() => {
										dispatch(logout());
										localStorage.removeItem("activeBoard");
									}}
								>Logout</button>
							</div>
						)
					}
				</div>
			</div >
		</>
	);
};

export default BoardList;
