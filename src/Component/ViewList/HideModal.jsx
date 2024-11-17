import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { creteView, updateView } from '../../Redux/BoardReducer';

const HideModal = ({ close }) => {
	const activeBoard = useSelector((state) => state.board.activeBoard);
	const activeView = useSelector((state) => state.board.selectedView);
	const dispatch = useDispatch();
	const [hiddenColumns, setHiddenColumns] = useState(activeView.hiddenColumns);

	const handleClick = () => {
		close();
		dispatch(updateView(
			{
				...activeView,
				BoardId: activeBoard._id,
				hiddenColumns: hiddenColumns
			}
		));
	}

	return (
		<div className='modal'>
			{activeBoard && Object.keys(activeBoard.columns).map((key, index) => (
				<div key={index}>
					<input type='checkbox' onClick={
						() => {
							if (hiddenColumns.includes(key)) {
								setHiddenColumns(hiddenColumns.filter((item) => item !== key));
							} else {
								setHiddenColumns([...hiddenColumns, key]);
							}
						}
					} checked={hiddenColumns.includes(key) ? true : false} />
					<label>{activeBoard.columns[key].value}</label>
				</div>
			))}
			<button onClick={handleClick}>Valider</button>
		</div>
	);
};

export default HideModal;
