import { BrowserRouter, Route, Routes } from "react-router-dom";
import Display from "../Display/Display";
import Login from "../Login/login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Calendar from "../../Component/Calendar/Calendar";
import Tables from "../../Component/Tables/Tables";
import RevealMarkdown from "../../Component/RevealMarkdown/RevealMarkdown";
import PresentationPage from "../MainPage/MainPage";
import ContactSection from "../Contact/contact";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import AboutUs from "../AboutUs/AboutUs";
import CursusPage from "../Cursus/Cursus";
import FooterSection from "../../components/Footer/footer";
import FormationPage from "../Formations/formations";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import FormationDetailPage from "../Formations/formationDetail";

const ScrollToTop = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
};


function App() {
	return (
		<BrowserRouter>
			<ScrollToTop />
			<Routes>
				{publicRoutes()}
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




function publicRoutes() {
	return (
		<>
			<Route path="/" element={
				<>
					<NavigationBar />
					<PresentationPage />
					<FooterSection />
				</>
			} />
			<Route path="/contact" element={
				<>
					<NavigationBar />
					<ContactSection />
					<FooterSection />
				</>
			} />
			<Route path="/formation/:customId" element={
				<>
					<NavigationBar />
					<FormationDetailPage />
					<FooterSection />
				</>
			} />
			<Route path="/cursus" element={
				<>
					<NavigationBar />
					<CursusPage />
					<FooterSection />
				</>
			} />
			<Route path="/about" element={
				<>
					<NavigationBar />
					<AboutUs />
					<FooterSection />
				</>
			} />
			<Route path="/formations" element={
				<>
					<NavigationBar />
					<FormationPage />
					<FooterSection />
				</>
			} />
			<Route path="/login" element={<>
				<NavigationBar />
				<Login />
				<FooterSection />
			</>
			} />
			{/* <Route path="/register" element={
				<>
					<NavigationBar />
					<Register />
				</>} /> */}
		</>
	);
}
export default App;
