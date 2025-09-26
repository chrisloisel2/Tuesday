import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";

import AboutUs from "../AboutUs/AboutUs";
import ContactSection from "../Contact/contact";
import Cursus from "../Cursus/Cursus";
import CursusPage from "../Cursus/CursusPage";
import Display from "../Display/Display";
import FormationDetailPage from "../Formations/formationDetail";
import FormationPage from "../Formations/formations";
import PresentationPage from "../MainPage/MainPage";
import LoginPage from "../Login/login";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import FooterSection from "../../components/Footer/footer";

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
                        {window.location.pathname === "/display" ? null : <NavigationBar />}
                        <ScrollToTop />
                        <Routes>
                                <Route path="/" element={<PresentationPage />} />
                                <Route path="/contact" element={<ContactSection />} />
                                <Route path="/formation/:customId" element={<FormationDetailPage />} />
                                <Route path="/cursus" element={<Cursus />} />
                                <Route path="/cursus/:id" element={<CursusPage />} />
                                <Route path="/about" element={<AboutUs />} />
                                <Route path="/formations" element={<FormationPage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/display" element={<Display />} />
                        </Routes>
                        <FooterSection />
                </BrowserRouter>
        );
}
export default App;
