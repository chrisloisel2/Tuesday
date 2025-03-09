import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../Redux/AuthReducer';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(login({ email, password })).then((data) => {
			if (!data.error) {
				navigate('/display');
			}
		});
	};

	return (
		<div className='login min-h-screen'>
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Email:</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className='text-black'
					/>
				</div>
				<div>
					<label>Password:</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						className='text-black'
					/>
				</div>
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;
