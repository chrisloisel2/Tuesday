import React from 'react';

const DeleteConfirmationModal = ({ onClose, onConfirm }) => {
	return (
		<div className="modal-backdrop">
			<div className="modal">
				<h3>Confirmer la suppression</h3>
				<p>Êtes-vous sûr de vouloir supprimer cette cellule ?</p>
				<div className="modal-actions">
					<button onClick={onConfirm} className="btn-confirm">Supprimer</button>
					<button onClick={onClose} className="btn-cancel">Annuler</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteConfirmationModal;
