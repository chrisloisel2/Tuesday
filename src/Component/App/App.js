import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Display from "../Display/Display";
import Login from "../Login/login";
import Register from "../Register/Register";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Calendar from "../Calendar/Calendar";
import Tables from "../Tables/Tables";
import BoardList from "../BoardList/BoardList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, refreshToken } from "../../Redux/AuthReducer";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route
					path="/display"
					element={
						<PrivateRoute>
							<Display />
						</PrivateRoute>
					}
				/>
				<Route
					path="/tables"
					element={
						<PrivateRoute>
							<Tables />
						</PrivateRoute>
					}
				/>
				<Route
					path="/calendar"
					element={
						<PrivateRoute>
							<Calendar />
						</PrivateRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
