import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegEdit, FaCog } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { IoIosCheckmark } from "react-icons/io";
import { IoDocumentTextOutline } from "react-icons/io5";
import { ArchiveBoard, CreateBoard, DeleteBoard, toggleFavoriteBoard, UpdateBoard } from '../../Redux/BoardReducer';

const BoardList = ({ selectBoard }) => {
	const dispatch = useDispatch();
	const boards = useSelector((state) => state.board.board);
	const [editState, setEditState] = useState({}); // Gérer l'état d'édition par board
	const [showModal, setShowModal] = useState({}); // Gérer l'état de la modale de paramètres par board
	const [showEdit, setShowEdit] = useState(false);

	if (!boards || boards.length === 0) {
		return <div>Loading...</div>;
	}

	const handleEditToggle = (boardId, title) => {
		setEditState((prev) => ({
			...prev,
			[boardId]: {
				edit: !prev[boardId]?.edit,
				title: title || prev[boardId]?.title || '',
			},
		}));
	};

	const handleTitleChange = (boardId, value) => {
		setEditState((prev) => ({
			...prev,
			[boardId]: {
				...prev[boardId],
				title: value,
			},
		}));

	};

	const handleKeyPress = (e, board) => {
		if (e.key === 'Enter') {
			handleEditToggle(board._id);
			if (editState[board._id]?.title !== board.title) {
				dispatch(UpdateBoard({ ...board, title: editState[board._id]?.title }));
			}
		}
	};

	const handleEdit = (board) => {
		handleEditToggle(board._id);
		if (editState[board._id]?.title !== board.title) {
			dispatch(UpdateBoard({ ...board, title: editState[board._id]?.title }));
		}
	};

	const toggleModal = (boardId) => {
		setShowModal((prev) => ({
			...prev,
			[boardId]: !prev[boardId], // Toggle la modale de paramètres
		}));
	};

	const handleDelete = (boardId) => {
		dispatch(DeleteBoard(boardId));
	};

	const handleArchive = (boardId) => {
		dispatch(ArchiveBoard(boardId));
	};

	const handleFavorite = (boardId) => {
		dispatch(toggleFavoriteBoard(boardId));
	};

	return (
		<div className="boardCpt">
			<div className="board-list">
				{boards.map((board) => (
					<div key={board._id} className="board-item-container">
						<button
							className="board-item"
							onClick={() => selectBoard(board)}
							onMouseEnter={() => setShowEdit(true)}
							onMouseLeave={() => setShowEdit(false)}
						>
							{editState[board._id]?.edit ? (
								<>
									<input
										type="text"
										value={editState[board._id]?.title || ''}
										onChange={(e) => handleTitleChange(board._id, e.target.value)}
										onKeyPress={(e) => handleKeyPress(e, board)}
									/>
									<IoIosCheckmark
										onClick={() => handleEdit(board)}
										style={{ fontSize: '20px', cursor: 'pointer' }}
									/>
								</>
							) : (
								<>
									<IoDocumentTextOutline style={{
										fontSize: '20px', marginRight: '10px',
										position: 'absolute', left: '0', zIndex: '10', height: '30px', padding: '5px'
									}} />
									<p style={{ margin: '0', marginLeft: '40px' }}
									>{board.title}</p>
								</>
							)}

							{
								showEdit && (
									<FaCog
										onClick={() => toggleModal(board._id)}
										style={{
											fontSize: '20px', cursor: 'pointer', marginLeft: '10px',
											position: 'absolute', right: '0',
											zIndex: '10',
											height: '30px',
											padding: '5px',
										}}
									/>
								)
							}
						</button>

						{/* Icône pour ouvrir la modale de paramètres */}



						{/* Modale de paramètres */}
						{showModal[board._id] && (
							<div className="board-modal">
								<ul>
									<li onClick={() => handleEditToggle(board._id, board.title)}>Modifier</li>
									<li onClick={() => handleDelete(board._id)}>Supprimer</li>
									<li onClick={() => handleArchive(board._id)}>Archiver</li>
									<li onClick={() => handleFavorite(board._id)}>Mettre en favoris</li>
								</ul>
							</div>
						)}
					</div>
				))}
				<button className="board-item" onClick={() => dispatch(CreateBoard())}
					style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}
				>
					<MdAdd />
				</button>
			</div>

			<style jsx>{`
        .board-item-container {
          display: flex;
          align-items: center;
          position: relative;
        }

        .board-modal {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border: 1px solid #ccc;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          z-index: 10000000;
        }

        .board-modal ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .board-modal ul li {
          padding: 8px 12px;
          cursor: pointer;
        }

        .board-modal ul li:hover {
          background-color: #f0f0f0;
        }
      `}</style>
		</div>
	);
};

export default BoardList;
