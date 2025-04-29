import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { creteView, updateView } from '../../Redux/ViewReducer';

const HideModal = ({ close }) => {
	const activeBoard = useSelector((state) => state.board.activeBoard);
	const activeView = useSelector((state) => state.view.selectedView);
	const dispatch = useDispatch();
	const [hiddenColumns, setHiddenColumns] = useState(activeView.hiddenColumns);

	const handleClick = () => {
		close();
		dispatch(updateView(
			{
				_id: activeView._id,
				hiddenColumns: hiddenColumns
			}
		));
	}

	return (
		<div className='modal flex flex-col gap-2 items-start justify-center'>
			{activeBoard && Object.keys(activeBoard.columns).map((key, index) => (
				<div key={index}>
					<input type='checkbox' onClick={
						() => {
							if (hiddenColumns.includes(activeBoard.columns[key]._id)) {
								setHiddenColumns(hiddenColumns.filter((item) => item !== activeBoard.columns[key]._id));
							} else {
								setHiddenColumns([...hiddenColumns, activeBoard.columns[key]._id]);
							}
						}
					}
						checked={hiddenColumns.includes(activeBoard.columns[key]._id) ? true : false} />
					<label>{activeBoard.columns[key].name}</label>
				</div>
			))}
			<button onClick={handleClick}>Valider</button>
		</div>
	);
};

export default HideModal;
