import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateColumns } from "../../Redux/BoardReducer";

const ResizeHandle = ({ columnKey, activeBoard, columns, setColumns }) => {
	const dispatch = useDispatch();

	const handleResizeMouseDown = (col) => (event) => {
		const startX = event.clientX;
		const startWidth = columns[col]?.width || 100;

		const onMouseMove = (e) => {
			const newWidth = Math.max(50, startWidth + (e.clientX - startX));
			setColumns((prevColumns) => ({
				...prevColumns,
				[col]: {
					...prevColumns[col],
					width: newWidth,
				},
			}));
		};

		const onMouseUp = () => {
			dispatch(updateColumns({ id: activeBoard._id, data: { ...columns } }));
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseup", onMouseUp);
		};

		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseup", onMouseUp);
	};

	return <div className="resize-handle" onMouseDown={handleResizeMouseDown(columnKey)} />;
};

export default ResizeHandle;
