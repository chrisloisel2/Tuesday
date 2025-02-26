// import React, { useState } from "react";
// import { MdAdd } from "react-icons/md";
// import { useDispatch, useSelector } from "react-redux";
// import { CreateBoard, GetBoard } from "../../Redux/BoardReducer";
// import { logout } from "../../Redux/AuthReducer";

// const BoardList = () => {
// 	const dispatch = useDispatch();
// 	const user = useSelector((state) => state.auth.user);
// 	const activeBoard = useSelector((state) => state.board.activeBoard);
// 	const boards = useSelector((state) => state.board.board);
// 	const [modal, setModal] = useState(false);

// 	return (
// 		<>
// 			<div className="board-list-container">
// 				<div className="menu">
// 					{boards.map((board, index) => (
// 						<button
// 							key={board._id}
// 							className={`board-item${activeBoard._id === board._id ? "-active" : ""}`}
// 							onClick={() => dispatch(GetBoard(board._id))}
// 						>
// 							<p>{board.title}</p>
// 						</button>
// 					))}
// 					<button
// 						className="board-item"
// 						style={{
// 							cursor: "pointer",
// 							display: "flex",
// 							alignItems: "center",
// 							justifyContent: "center",
// 							fontSize: "20px",
// 						}}
// 					>
// 						<MdAdd onClick={() => dispatch(CreateBoard(
// 							{
// 								title: "New Board",
// 							}
// 						))} />
// 					</button>
// 				</div>
// 				<div className="user-view" onClick={() => setModal(!modal)}>
// 					<h3>{user?.name}</h3>
// 					<img src={user?.avatar} alt="user" />
// 					{
// 						modal && (
// 							<div className="modal">
// 								<button
// 									onClick={() => {
// 										dispatch(logout());
// 										localStorage.removeItem("activeBoard");
// 									}}
// 								>Logout</button>
// 							</div>
// 						)
// 					}
// 				</div>
// 			</div >
// 		</>
// 	);
// };

// export default BoardList;

// nouveau compo anti sunburn
import React, { useState, useMemo, useCallback } from "react";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { CreateBoard, GetBoard } from "../../Redux/BoardReducer";
import { logout } from "../../Redux/AuthReducer";

const BoardList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const activeBoard = useSelector((state) => state.board.activeBoard);
  const boards = useSelector((state) => state.board.board);
  const [modal, setModal] = useState(false);

  const boardButtons = useMemo(
    () =>
      boards.map((board) => (
        <button
          key={board._id}
          className={`board-item${
            activeBoard._id === board._id ? "-active" : ""
          }`}
          onClick={() => dispatch(GetBoard(board._id))}
        >
          <p>{board.title}</p>
        </button>
      )),
    [boards, activeBoard, dispatch]
  );

  const toggleModal = useCallback(() => {
    setModal((prev) => !prev);
  }, []);

  return (
    <div className="board-list-container">
      <div className="menu">
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

      <div className="user-view" onClick={toggleModal}>
        <h3>{user?.name}</h3>
        <img src={user?.avatar} alt="user" />
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
  );
};

export default BoardList;
