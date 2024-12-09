import React from 'react';

const FileModal = ({ isOpen, onClose, fileUrl, onDelete }) => {
	if (!isOpen) return null;

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<h3>Fichier</h3>
				<div className="modal-actions">
					<a href={fileUrl} target="_blank" rel="noopener noreferrer">
						Consulter
					</a>
					<a href={fileUrl} download>
						Télécharger
					</a>
					<button onClick={onDelete}>Supprimer</button>
				</div>
				<button onClick={onClose}>Fermer</button>
			</div>
		</div>
	);
};

export default FileModal;
