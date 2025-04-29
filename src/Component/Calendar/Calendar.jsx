import React, { useEffect, useState } from "react";
import "./Calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "moment/locale/fr";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Redux/UserReducer";
import { getAllItems } from "../../Redux/ItemReducer";
import { FaGear } from "react-icons/fa6"; // Gardé si nécessaire
import CustomToolbar from "./customToolbar";

const Calendrier = () => {
	const dispatch = useDispatch();

	const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
	const [view, setView] = useState("month");
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [popup, setPopup] = useState(false);

	const [parsing, setParsing] = useState({
		date: "67e2d45e355d374ac785a1e3",
		color: "67e2d48e355d374ac785a1f8",
		title: "67e2d3ea355d374ac785a1b3",
		formateur: "67e2d48e355d374ac785a1f8",
	});

	const userRole = useSelector((state) => state.auth.user?.role);
	const users = useSelector((state) => state.users.users);
	const items = useSelector((state) => state.items.items);
	const cells = useSelector((state) => state.cell.cells);
	const activeBoard = useSelector((state) => state.board.activeBoard);

	useEffect(() => {
		moment.locale("fr");
		moment.updateLocale("fr", {
			week: {
				dow: 1, // Lundi premier jour
			},
		});
		dispatch(getAllUsers());
	}, [dispatch]);

	useEffect(() => {
		if (users.length > 0) {
			const idsSansAdmin = users
				.filter((user) => user.name !== "admin")
				.map((user) => user._id);
			setFilteredUsers(idsSansAdmin);
		}
	}, [users]);

	const localizer = momentLocalizer(moment);
	const messages = {
		allDay: "Toute la journée",
		previous: "Précédent",
		next: "Suivant",
		today: "Aujourd'hui",
		month: "Mois",
		week: "Semaine",
		day: "Jour",
		agenda: "Agenda",
		date: "Date",
		time: "Heure",
		event: "Événement",
		noEventsInRange: "Aucun événement dans cette période.",
		showMore: (total) => `+ Voir plus (${total})`,
	};

	const filteredEvents = Object.values(items).map((item) => {
		console.log("date", cells[`${item._id}-${parsing.date}`]);
		console.log("date", cells[`${parsing.date}-${item._id}`]);
		const start = new Date(cells[`${item._id}-${parsing.date}`]?.value?.start);
		const end = new Date(cells[`${item._id}-${parsing.date}`]?.value?.end);
		const formateur = cells[`${item._id}-${parsing.formateur}`]?.value?.label;
		const color = cells[`${item._id}-${parsing.color}`]?.value?.color;
		const title = cells[`${item._id}-${parsing.title}`]?.value;

		return {
			...item,
			start: start,
			end: end,
			title: title,
			formateur: formateur,
			color: color,
		};
	})
	// Ex. :
	// const filteredEvents = Object.values(items).filter((event) =>
	//   filteredUsers.includes(event.userId)
	// );

	console.log("filteredEvents", filteredEvents);


	const toggleUserFilter = (userId) => {
		if (filteredUsers.includes(userId)) {
			setFilteredUsers(filteredUsers.filter((id) => id !== userId));
		} else {
			setFilteredUsers([...filteredUsers, userId]);
		}
	};

	// Changement de vue (mois, semaine, jour, etc.)
	const handleViewChange = (newView) => {
		setView(newView);
	};

	// (Exemple) Ouvrir la fenêtre de création d'événement
	const handleCreateEventModal = () => {
		setIsCreateEventModalOpen(true);
	};

	// Personnalisation de l’affichage d’un événement
	// Par exemple, on masque les événements qui tombent le week-end.
	const eventPropGetter = (event) => {
		const start = new Date(event?.start);
		const end = new Date(event?.end);
		const title = event?.title;
		const formateur = event?.formateur;
		const color = event?.color;



		// Correction : Samedi = 6, Dimanche = 0
		const isWeekend = (date) => {
			const day = date.getDay();
			return day === 6 || day === 0;
		};

		if (isNaN(start) || isNaN(end)) {
			return {};
		}

		if (isWeekend(start) || isWeekend(end)) {
			return { style: { display: "none" } };
		}

		return {
			style: {
				backgroundColor: color,
			},
		};
	};

	return (
		<div className="calendar-container">
			{/* Popup Settings */}
			{popup && (
				<div className="bg-gray-800 w-full h-full absolute top-0 left-0 flex items-center justify-center z-50">
					<div className="popup-content">
						<h2 className="text-2xl font-bold text-white">Settings</h2>

						<p className="text-white">
							Colonne de date :
							<select
								value={parsing.date}
								onChange={(e) => setParsing({ ...parsing, date: e.target.value })}
								className="select p-2 text-black"
							>
								<option value="">Aucun</option>
								{activeBoard?.columns.map((column) => (
									<option key={column._id} value={column._id}>
										{column.name}
									</option>
								))}
							</select>
						</p>

						<p className="text-white">
							Couleur de l'événement :
							<select
								value={parsing.color}
								onChange={(e) => setParsing({ ...parsing, color: e.target.value })}
								className="select p-2 text-black"
							>
								<option value="">Aucun</option>
								{activeBoard?.columns.map((column) => (
									<option key={column._id} value={column._id}>
										{column.name}
									</option>
								))}
							</select>
						</p>

						<button onClick={() => setPopup(false)}>Close</button>
					</div>
				</div>
			)}

			{/* Barre de légende (utilisateurs + bouton settings) */}
			<div
				className="legend flex-1  h-full px-4"
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				{userRole === "admin" && (
					<ul
						style={{
							listStyle: "none",
							padding: 0,
							margin: 0,
							display: "flex",
							flexWrap: "wrap",
							flexDirection: "row",
							color: "white",
						}}
					>
						{users
							.filter((u) => u.name !== "admin")
							.map((u) => (
								<li
									key={u._id}
									style={{
										display: "flex",
										alignItems: "center",
										flexDirection: "row",
										margin: "5px",
										cursor: "pointer",
										opacity: filteredUsers.includes(u._id) ? 1 : 0.5,
									}}
									onClick={() => toggleUserFilter(u._id)}
								>
									<span
										style={{
											width: "20px",
											height: "20px",
											backgroundColor: u.color,
											borderRadius: "50%",
											display: "inline-block",
											marginRight: "10px",
										}}
									></span>
									{u.name}
								</li>
							))}
					</ul>
				)}

				<FaGear
					onClick={() => setPopup(!popup)}
					style={{
						cursor: "pointer",
						color: "white",
						fontSize: "20px",
						marginLeft: "10px",
					}}
				/>
			</div>

			{/* Zone du calendrier */}
			<div className="flex-1 w-full h-full">
				<Calendar
					localizer={localizer}
					events={filteredEvents}
					startAccessor="start"
					endAccessor="end"
					style={{ height: 800 }}
					messages={messages}
					eventPropGetter={eventPropGetter}
					view={view}
					onView={handleViewChange}
					components={{
						toolbar: CustomToolbar,
						event: ({ event }) => (
							<div>
								{event.title}
							</div>
						),
					}}
				/>
			</div>
		</div >
	);
};

export default Calendrier;
