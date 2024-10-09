import React, { useReducer } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, useNavigate, Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
	const isConnected = useSelector((state) => state.auth.isConnected);
	const status = useSelector((state) => state.auth.status);

	if (status !== 'succeeded') {
		return <Navigate to="/" />;
	}
	return children;
};

export default PrivateRoute;
