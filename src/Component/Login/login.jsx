import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Redux/AuthReducer';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const auth = useSelector((state) => state.auth);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(login({ email, password })).then((data) => {
			if (!data.error) {
				navigate('/display');
			}
		});
	};

	return (
		<div className='login'>
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Email:</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Password:</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type="submit">Login</button>
			</form>
			<a href="/register">Register</a>
		</div>
	);
};

export default Login;
