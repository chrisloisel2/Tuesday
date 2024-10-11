import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Dialog, Button } from '@mui/material';
import '@mui/material/Button';
import 'DateRangePickerModal.css';

const DateRangePickerModal = ({ startDate, endDate }) => {
	const [open, setOpen] = useState(false);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div>
			{/* Bouton pour ouvrir la modale */}
			<Button variant="outlined" onClick={handleOpen}>
				Définir les dates
			</Button>

			{/* Modale avec le sélecteur de dates */}
			<Dialog open={open} onClose={handleClose} maxWidth="md">
				<div style={{ padding: '20px', backgroundColor: '#2e2e2e', color: '#fff' }}>
					<h2>Définir les dates</h2>

					{/* Composant DatePicker */}
					<DatePicker
						selected={startDate}
						onChange={(dates) => {
							const [start, end] = dates;
							setStartDate(start);
							setEndDate(end);
						}}
						startDate={startDate}
						endDate={endDate}
						selectsRange
						inline
					/>
					<div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
						<Button onClick={handleClose} variant="contained" color="primary">
							Confirmer
						</Button>
						<Button onClick={handleClose} variant="outlined" color="secondary">
							Annuler
						</Button>
					</div>
				</div>
			</Dialog>
		</div>
	);
};

export default DateRangePickerModal;
