import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Display from "../Display/Display";
import Login from "../Login/login";
import Register from "../Register/Register";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Calendar from "../../Component/Calendar/Calendar";
import Tables from "../../Component/Tables/Tables";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, refreshToken } from "../../Redux/AuthReducer";
import RevealMarkdown from "../../Component/RevealMarkdown/RevealMarkdown";
import PresentationPage from "../MainPage/MainPage";
import ContactSection from "../Contact/contact";
import NavigationBar from "../../components/NavigationBar/NavigationBar";

function App() {
	return (
		<BrowserRouter>
			<Routes>

				<Route path="/" element={<PresentationPage />} />
				<Route path="/contact" element={<ContactSection />} />
				<Route path="/login" element={<Login />} />
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
				<Route path="/cours/:urlId/:templateId" element={<RevealMarkdown />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
