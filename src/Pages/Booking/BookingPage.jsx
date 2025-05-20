import { useState } from "react";
import {
	Card,
	CardContent,
	CardActions,
	CardHeader,
	Typography,
	TextField,
	Button,
	MenuItem,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion";
import MyAxios from "../../Interceptor/MyAxios";
import axios from "axios";

export default function PreTrainingBooking({ formation, setBooking }) {
	const [date, setDate] = useState(null);
	const [time, setTime] = useState(null);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [company, setCompany] = useState("");
	const [position, setPosition] = useState("");
	const [goals, setGoals] = useState("");
	const [format, setFormat] = useState("");
	const [status, setStatus] = useState("idle");

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!date || !time) return;

		setStatus("loading");
		try {
			const res = await axios.post("https://hook.eu1.make.com/sojb82lc348psx4stgqf5ynox1crka1u", {
				date: date.toISOString().split("T")[0],
				time: time.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
				name,
				email,
				company,
				goals,
				format,
				formation
			});
			if (res.status !== 200) throw new Error("Booking error");
			setStatus("success");
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setBooking(false);
		} catch (err) {
			console.error(err);
			setStatus("error");
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="flex items-center justify-center min-h-screen bg-transparent p-4"
			onClick={(e) => e.stopPropagation()}
			style={{ overflow: "hidden", height: "100vh" }}
		>
			<Card sx={{ width: "100%", maxWidth: 640, p: 3, borderRadius: 3, boxShadow: 3 }}>
				<CardHeader
					title={<Typography variant="h5">Rendez-vous pré-formation</Typography>}
					subheader="Choisissez une date et une heure pour discuter des modalités et objectifs de votre formation."
				/>

				<form onSubmit={handleSubmit}>
					<CardContent sx={{ display: "grid", gap: 2 }}>
						<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
							<div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
								<DatePicker
									label="Date du rendez-vous"
									className="w-1/2"
									value={date}
									onChange={(newValue) => setDate(newValue)}
									renderInput={(params) => <TextField required {...params} sx={{ flex: 1 }} />}
									minDate={new Date()}
									shouldDisableDate={(day) => {
										// Disable weekends (Saturday: 6, Sunday: 0)
										const dayOfWeek = day.getDay();
										return dayOfWeek === 0 || dayOfWeek === 6;
									}}
								/>
								<TimePicker
									label="Heure du rendez-vous"
									value={time}
									className="w-1/2"
									onChange={(newValue) => setTime(newValue)}
									minutesStep={30}
									minTime={new Date(0, 0, 0, 9, 0)}
									maxTime={new Date(0, 0, 0, 18, 0)}
									renderInput={(params) => <TextField required {...params} sx={{ flex: 1 }} />}
								/>
							</div>
						</LocalizationProvider>

						<TextField
							label="Nom complet"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
						<TextField
							label="E-mail"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<TextField
							label="Entreprise"
							value={company}
							onChange={(e) => setCompany(e.target.value)}
							required
						/>
						<TextField
							label="Format souhaité (présentiel / à distance)"
							value={format}
							onChange={(e) => setFormat(e.target.value)}
							required
							select
						>
							{[
								"Présentiel",
								"À distance",
								"Hybride",
								"En entreprise",
							].map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</TextField>
						<TextField
							label="Objectifs de la formation"
							value={goals}
							onChange={(e) => setGoals(e.target.value)}
							multiline
							rows={3}
						/>
					</CardContent>

					<CardActions sx={{ flexDirection: "column", alignItems: "stretch", gap: 1 }}>
						<Button
							type="submit"
							variant="contained"
							disabled={status === "loading" || !date || !time}
							fullWidth
						>
							{status === "loading" ? "Envoi…" : "Planifier ma séance pré-formation"}
						</Button>

						{status === "success" && (
							<Typography color="success.main" variant="body2" textAlign="center">
								Votre séance pré-formation a été planifiée ! Vous recevrez prochainement un e-mail de confirmation.
							</Typography>
						)}
						{status === "error" && (
							<Typography color="error.main" variant="body2" textAlign="center">
								Une erreur est survenue. Merci de réessayer ultérieurement.
							</Typography>
						)}
					</CardActions>
				</form>
			</Card>
		</motion.div >
	);
}
