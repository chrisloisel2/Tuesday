import React, { useState } from 'react';
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Redux/AuthReducer';
import { useNavigate } from 'react-router-dom';
import './login.css';
const COLORS = ["#AEEFFF", "#4AB3E2", "#1A2B3C", "#E8F9FF", "#6B8BA4"];


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

function BackgroundNeuralNetwork() {
	const points = Array.from({ length: 40 }, () => ({
		x: Math.random() * 100 + "%",
		y: Math.random() * 100 + "%",
		color: COLORS[Math.floor(Math.random() * COLORS.length)],
	}));

	const filteredConnections = [];
	points.forEach((pointA, indexA) => {
		points.forEach((pointB, indexB) => {
			if (
				indexA < indexB &&
				Math.abs(parseFloat(pointA.x) - parseFloat(pointB.x)) < 20 &&
				Math.abs(parseFloat(pointA.y) - parseFloat(pointB.y)) < 20
			) {
				filteredConnections.push({ pointA, pointB });
			}
		});
	});

	return (
		<motion.svg
			className="absolute inset-0 w-full h-full z--1"
			xmlns="http://www.w3.org/2000/svg"
		>
			{points.map((point, index) => (
				<motion.circle
					key={index}
					cx={point.x}
					cy={point.y}
					r="3"
					fill={point.color}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1, delay: 0.5 + index * 0.03 }}
				/>
			))}
			{filteredConnections.map((connection, index) => (
				<motion.line
					key={`line-${index}`}
					x1={connection.pointA.x}
					y1={connection.pointA.y}
					x2={connection.pointB.x}
					y2={connection.pointB.y}
					stroke={connection.pointA.color}
					strokeWidth="1"
					initial={{ opacity: 0 }}
					animate={{ opacity: 0.5 }}
					transition={{ duration: 1, delay: 1 + index * 0.05 }}
				/>
			))}
		</motion.svg>
	);
}

export default Login;
