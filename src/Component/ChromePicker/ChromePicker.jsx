import React, { useState } from 'react';
import { ChromePicker } from 'react-color';

const Colors = [
	"#FF6900",
	"#FCB900",
	"#7BDCB5",
	"#00D084",
	"#8ED1FC",
	"#0693E3",
	"#ABB8C3",
	"#EB144C",
	"#F78DA7",
	"#9900EF",
];

const ColorPicker = ({ color = "#9900EF", setColor }) => {
	const [modalOpen, setModalOpen] = useState(false);

	const toggleModal = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setModalOpen(!modalOpen);
	};

	const handleColorSelect = (selectedColor, e) => {
		e.stopPropagation();
		setColor(selectedColor);
		setModalOpen(false);
	};

	const handleCustomColorChange = (newColor, e) => {
		e.stopPropagation();
		setColor(newColor.hex);
	};

	return (
		<div style={{ position: 'relative', display: 'inline-block' }} onClick={(e) => e.stopPropagation()}>
			<div
				style={{
					width: '16px',
					height: '16px',
					borderRadius: '50%',
					background: color.color,
					cursor: 'pointer',
					border: '1px solid #ccc',
				}}
				onClick={toggleModal}
			/>

			{/* Color Picker Modal */}
			{modalOpen && (
				<div style={{
					position: 'absolute',
					top: '40px',
					left: 0,
					zIndex: 100000,
					background: 'white',
					padding: '10px',
					borderRadius: '5px',
					boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
				}} onClick={(e) => e.stopPropagation()}>
					<div style={{ marginBottom: '10px', display: 'flex', gap: '5px' }}>
						{Colors.map((presetColor) => (
							<div
								key={presetColor}
								style={{
									width: '36px',
									height: '36px',
									borderRadius: '50%',
									background: presetColor,
									cursor: 'pointer',
									border: presetColor === color.color ? '2px solid black' : 'none',
								}}
								onClick={(e) => handleColorSelect(presetColor, e)}
							/>
						))}
					</div>

				</div>
			)}

			{modalOpen && (
				<div
					onClick={toggleModal}
					style={{
						position: 'fixed',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						zIndex: 1,
					}}
				/>
			)}
		</div>
	);
};

export default ColorPicker;
