import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../Redux/AuthReducer';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();


	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: ''
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission logic here
		console.log('Form submitted:', formData);
		dispatch(register(formData)).then((result) => {
			console.log('Register result:', result);
			navigate('/display');
		});
	};

	return (
		<div className='login'>
			< h2 > Register</h2 >
			<form onSubmit={handleSubmit}>
				<div>
					<label>name:</label>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label>Email:</label>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label>Password:</label>
					<input
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</div>
				<button type="submit">Register</button>
				<a href="/">Login</a>
			</form>
		</div >
	);
};

export default Register;
