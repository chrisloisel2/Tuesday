import React, { useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect, useNavigate, Navigate } from 'react-router-dom';
import { refreshToken } from '../../Redux/AuthReducer';
import Cookies from 'js-cookie';

export const isAuthenticated = () => {
	const token = Cookies.get('auth_token');
	return !!token;
};


const PrivateRoute = ({ children }) => {
	const isConnected = useSelector((state) => state.auth.isConnected);
	const status = useSelector((state) => state.auth.status);
	const dispatch = useDispatch();

	if (status === 'idle') {
		dispatch(refreshToken());
	}

	if (!isAuthenticated || isConnected === false) {
		return <Navigate to="/" />;
	}
	return children;
};

export default PrivateRoute;
