import React, { useState } from "react";
import MyAxios from "../../Interceptor/MyAxios";
import { FaFileAlt } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { MdSave } from "react-icons/md";
import { useDispatch } from "react-redux";
import { updateFile } from "../../Redux/BoardReducer";
import axios from "axios";

// 📂 Composant d'upload
const FileUpload = ({ handleFileUpload, uploading, reactKey }) => {

	if (uploading) {
		return <label className="flex items-center gap-2 p-2 rounded-lg cursor-not-allowed bg-gray-700 text-white">Uploading...</label>;
	}


	return (
		<label className="flex items-center gap-2 p-2 rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-800 text-white">
			<FiUpload size={24} />
			<span>Upload File</span>
			<input type="file" onChange={(e) => handleFileUpload(e.target.files[0], reactKey)} disabled={uploading} hidden />
		</label>
	);
};

const FilePopover = ({ fileUrl, onClose, onDelete, onOpenPdf, onEditMd, isMdFile, reactKey }) => {
	return (
		<div className="absolute top-10 left-0 bg-white shadow-lg rounded-lg p-3 z-50 w-48 transition-transform scale-100 bg-[#2c2f38]">
			<div className="modal-arrow" />
			<div className="flex flex-col rounded-lg shadow-lg space-y-2 justify-start items-start bg-[#2c2f38]">
				{isMdFile ? (
					<button onClick={onEditMd} className="block w-full text-left text-yellow-500 hover:text-yellow-600 py-1 bg-white">
						Modifier
					</button>
				) : (
					<button onClick={onOpenPdf} className="block w-full text-left text-blue-500 hover:text-blue-600 py-1 bg-white">
						Voir
					</button>
				)}
				<button onClick={() => { onDelete(reactKey); onClose(); }} className="block w-full text-left text-red-500 hover:text-red-600 py-1 bg-white">
					Supprimer
				</button>
			</div>
		</div>
	);
};

const MarkdownEditor = ({ content, onSave, onCancel }) => {
	const [text, setText] = useState(content);

	return (
		<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50">
			<div className="relative w-[60%] h-[70%] bg-white shadow-lg rounded-lg p-4 flex flex-col">
				<textarea
					className="w-full h-full p-3 border rounded resize-none text-[black] text-sm"
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<div className="flex justify-end mt-3">
					<button onClick={() => onSave(text)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center">
						<MdSave className="mr-2 relative" /> Enregistrer
					</button>
					<button onClick={onCancel} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
						Annuler
					</button>
				</div>
			</div>
		</div>
	);
};

const FileCpnt = ({ item, handleDelete, handleFileUpload, uploading, reactKey }) => {
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	const [showPdf, setShowPdf] = useState(false);
	const [editMd, setEditMd] = useState(false);
	const [mdContent, setMdContent] = useState(null);
	const dispatch = useDispatch();

	const isMdFile = item?.value?.endsWith(".md");

	const Raffraichir = async () => {
		try {
			// Forcer la récupération du contenu hors cache
			const response = await axios.get(item.value, { headers: { "Cache-Control": "no-cache" } });
			const text = await response.data;
			setMdContent(text);
		}
		catch (error) {
			console.error("❌ Erreur de chargement du fichier Markdown :", error);
		}
	};

	// 📄 Édition d'un fichier Markdown
	const handleEditMd = async () => {
		try {
			Raffraichir().then(
				() => {
					setEditMd(true);
				}
			);
		} catch (error) {
			console.error("❌ Erreur de chargement du fichier Markdown :", error);
		}
	};

	const handleSaveMd = async (newContent) => {
		try {
			const formData = new FormData();
			formData.append("existingFileKey", item.value);
			const blob = new Blob([newContent], { type: "text/markdown" });
			formData.append("file", blob, "updated-file.md");
			formData.append("filename", item.value.split("/").pop());
			dispatch(updateFile(formData));
			setMdContent(newContent);
			setEditMd(false);
		} catch (error) {
			console.error("❌ Erreur lors de l'enregistrement du fichier Markdown :", error);
		}
		finally {
			Raffraichir();
		}
	};


	const closeAll = () => {
		setIsPopoverOpen(false);
		setShowPdf(false);
		setEditMd(false);
	};

	return (
		<div className="relative flex items-center gap-2 justify-center">
			{item?.value ? (
				<>
					<FaFileAlt size={24} className="text-white cursor-pointer" onClick={() => setIsPopoverOpen(!isPopoverOpen)} />
					{isPopoverOpen && (
						<FilePopover
							fileUrl={item.value}
							onClose={() => setIsPopoverOpen(false)}
							onDelete={handleDelete}
							onOpenPdf={() => setShowPdf(true)}
							onEditMd={handleEditMd}
							isMdFile={isMdFile}
							reactKey={reactKey}
						/>
					)}
				</>
			) : (
				<FileUpload handleFileUpload={handleFileUpload} uploading={uploading} reactKey={reactKey} />
			)}
			{showPdf && <PdfViewer fileUrl={item.value} onClose={() => closeAll()} />}
			{editMd && <MarkdownEditor content={mdContent} onSave={handleSaveMd} onCancel={() => closeAll()} />}
		</div>
	);
};

const PdfViewer = ({ fileUrl, onClose }) => {
	return (
		<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50">
			<div className="relative w-[90%] h-[90%] bg-white shadow-lg rounded-lg overflow-hidden">
				<button onClick={onClose} className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 z-50">
					✖
				</button>
				<iframe title="document" src={fileUrl} width="100%" height="100%" className="border-none" />
			</div>
		</div>
	);
};

export default FileCpnt;
