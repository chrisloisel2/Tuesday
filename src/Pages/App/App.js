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
import FooterSection from "../../components/Footer/footer";
import FormationPage from "../Formations/formations";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import FormationDetailPage from "../Formations/formationDetail";
import BookingPage from "../Booking/BookingPage";
import CursusPage from "../Cursus/CursusPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Cursus from "../Cursus/Cursus";

const ScrollToTop = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
};

const queryClient = new QueryClient();

function App() {
	console.log("App", window.location.pathname);
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				{
					window.location.pathname == "/login" || window.location.pathname == "/display" || window.location.pathname.match(/\/cours\/.*/) ?
						null :
						<NavigationBar />
				}
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
						path="booking"
						element={
							<BookingPage />
						}
					></Route>
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
				<FooterSection />
			</BrowserRouter>
		</QueryClientProvider>

	);
}




function publicRoutes() {
	return (
		<>
			<Route path="/" element={<PresentationPage />} />
			<Route path="/contact" element={<ContactSection />} />
			<Route path="/formation/:customId" element={<FormationDetailPage />} />
			<Route path="/cursus" element={<Cursus />} />
			<Route path="/cursus/:id" element={<CursusPage />} />
			<Route path="/about" element={<AboutUs />} />
			<Route path="/formations" element={<FormationPage />} />
			<Route path="/login" element={<Login />} />
			{/* <Route path="/register" element={
				<>
					<NavigationBar />
					<Register />
				</>} /> */}
		</>
	);
}
export default App;
