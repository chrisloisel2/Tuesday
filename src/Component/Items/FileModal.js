import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaFileAlt } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { MdSave } from "react-icons/md";
import { updateCell, createCell } from "../../Redux/cellReducer";
import axios from "axios";
import { updateFile, uploadFile } from "../../Redux/BoardReducer";

const FileUpload = ({ onFileUpload, uploading }) => {
	return uploading ? (
		<label className="flex items-center gap-2 p-2 rounded-lg cursor-not-allowed bg-gray-700 text-white">
			Uploading...
		</label>
	) : (
		<label className="flex items-center gap-2 p-2 rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-800 text-white">
			<FiUpload size={24} />
			<input
				type="file"
				onChange={(e) => onFileUpload(e.target.files[0])}
				hidden
			/>
		</label>
	);
};

const FilePopover = ({ onClose, onDelete, onView, onEdit, isMdFile }) => (
	<div className="absolute top-10 left-0 bg-[#2c2f38] shadow-lg rounded-lg p-3 z-50 w-48">
		<div className="modal-arrow" />
		<div className="flex flex-col space-y-2">
			{isMdFile ? (
				<button onClick={onEdit} className="text-yellow-500 hover:text-yellow-600 bg-white py-1 rounded">
					Modifier
				</button>
			) : (
				<button onClick={onView} className="text-blue-500 hover:text-blue-600 bg-white py-1 rounded">
					Voir
				</button>
			)}
			<button onClick={onDelete} className="text-red-500 hover:text-red-600 bg-white py-1 rounded">
				Supprimer
			</button>
		</div>
	</div>
);

const MarkdownEditor = ({ content, onSave, onCancel }) => {
	const [text, setText] = useState(content);

	return (
		<div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
			<div className="w-3/5 h-3/4 bg-white rounded-lg p-4 flex flex-col">
				<textarea
					className="flex-1 p-3 border rounded resize-none text-black"
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<div className="flex justify-end gap-2 mt-2">
					<button onClick={() => onSave(text)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center">
						<MdSave className="mr-1" /> Enregistrer
					</button>
					<button onClick={onCancel} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
						Annuler
					</button>
				</div>
			</div>
		</div>
	);
};

const PdfViewer = ({ fileUrl, onClose }) => (
	<div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
		<div className="w-[90%] h-[90%] bg-white rounded-lg overflow-hidden relative">
			<button onClick={onClose} className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
				✖
			</button>
			<iframe src={fileUrl} width="100%" height="100%" title="PDF Viewer" />
		</div>
	</div>
);

const FileCpnt = ({ item, columnId }) => {
	const dispatch = useDispatch();
	const cell = useSelector((state) => state.cell.cells[`${item._id}-${columnId}`]);

	const [isPopoverOpen, setPopoverOpen] = useState(false);
	const [showPdf, setShowPdf] = useState(false);
	const [editMd, setEditMd] = useState(false);
	const [mdContent, setMdContent] = useState("");
	const [uploading, setUploading] = useState(false);

	const isMdFile = cell?.value?.endsWith(".md");

	const fetchMdContent = async () => {
		try {
			const response = await axios.get(cell.value, { headers: { "Cache-Control": "no-cache" } });
			setMdContent(response.data);
		} catch (error) {
			console.error("Erreur chargement markdown:", error);
		}
	};

	const handleFileUpload = async (file) => {
		setUploading(true);
		const formData = new FormData();
		formData.append("file", file);
		formData.append("itemId", item._id);
		formData.append("columnId", columnId);
		if (cell) {
			formData.append("existingFileKey", cell.value);
		}

		dispatch(uploadFile(formData)).then((response) => {
			if (response.payload) {
				const fileUrl = response.payload.fileUrl;
				if (cell) {
					dispatch(updateCell({ itemId: item._id, columnId, value: fileUrl }));
				} else {
					dispatch(createCell({ itemId: item._id, columnId, value: fileUrl }));
				}
				setUploading(false);
			}
		});


	};

	const handleDelete = () => {
		dispatch(updateCell({ itemId: item._id, columnId, value: "" }));
		setPopoverOpen(false);
	};

	const handleSaveMd = async (newContent) => {
		const formData = new FormData();
		const blob = new Blob([newContent], { type: "text/markdown" });
		formData.append("file", blob, "updated.md");
		formData.append("itemId", item._id);
		formData.append("columnId", columnId);

		dispatch(updateCell(formData));
		setEditMd(false);
	};

	const openEditor = async () => {
		await fetchMdContent();
		setEditMd(true);
	};

	return (
		<div className="relative flex items-center justify-center">
			{cell?.value ? (
				<>
					<FaFileAlt className="text-white cursor-pointer" size={24} onClick={() => setPopoverOpen(!isPopoverOpen)} />
					{isPopoverOpen && (
						<FilePopover
							fileUrl={cell.value}
							onClose={() => setPopoverOpen(false)}
							onDelete={handleDelete}
							onView={() => setShowPdf(true)}
							onEdit={openEditor}
							isMdFile={isMdFile}
						/>
					)}
				</>
			) : (
				<FileUpload onFileUpload={handleFileUpload} uploading={uploading} />
			)}

			{showPdf && <PdfViewer fileUrl={cell.value} onClose={() => setShowPdf(false)} />}
			{editMd && <MarkdownEditor content={mdContent} onSave={handleSaveMd} onCancel={() => setEditMd(false)} />}
		</div>
	);
};

export default FileCpnt;
