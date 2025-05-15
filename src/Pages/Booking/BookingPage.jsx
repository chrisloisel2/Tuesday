import { useState } from "react";
import {
	Card,
	CardContent,
	CardActions,
	CardHeader,
	Typography,
	TextField,
	Button,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion";
import MyAxios from "../../Interceptor/MyAxios";


export default function BookingPage() {
	const [date, setDate] = useState(null);
	const [time, setTime] = useState(null);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState("idle");

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!date || !time) return;

		setStatus("loading");
		try {
			const res = MyAxios.post("/meeting/", {
				date: date.toISOString().split("T")[0],
				time: time.toLocaleTimeString("fr-FR", {
					hour: "2-digit",
					minute: "2-digit",
				}),
				name,
				email,
			});
			if (res.status !== 200) throw new Error("Booking error");
			setStatus("success");
		} catch (err) {
			console.error(err);
			setStatus("error");
		}
		// 		const res = await fetch(WEBHOOK_URL, {
		// 			method: "POST",
		// 			headers: { "Content-Type": "application/json" },
		// 			body: JSON.stringify({
		// 				date: date.toISOString().split("T")[0],
		// 				time: time.toLocaleTimeString("fr-FR", {
		// 					hour: "2-digit",
		// 					minute: "2-digit",
		// 				}),
		// 				name,
		// 				email,
		// 			}),
		// 		});
		// 		if (!res.ok) throw new Error("Webhook error");
		// 		setStatus("success");
		// 	} catch (err) {
		// 		console.error(err);
		// 		setStatus("error");
		// 	}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="flex items-center justify-center min-h-screen  bg-gradient-to-b from-gray-900 to-gray-800  p-4"
		>
			<Card sx={{ width: "100%", maxWidth: 640, p: 3, borderRadius: 3, boxShadow: 3 }}>
				<CardHeader
					title={<Typography variant="h5">Prendre rendez‑vous</Typography>}
					subheader="Choisissez la date et l'heure qui vous conviennent puis validez le formulaire."
				/>
				<form onSubmit={handleSubmit}>
					<CardContent sx={{ display: "grid", gap: 2 }}>
						<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
							<DatePicker
								label="Date"
								value={date}
								onChange={(newValue) => setDate(newValue)}
								renderInput={(params) => <TextField required {...params} />}
							/>
							<TimePicker
								label="Heure"
								value={time}
								onChange={(newValue) => setTime(newValue)}
								minutesStep={30}
								renderInput={(params) => <TextField required {...params} />}
							/>
						</LocalizationProvider>
						<TextField
							label="Nom complet"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
						<TextField
							label="E‑mail"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</CardContent>
					<CardActions sx={{ flexDirection: "column", alignItems: "stretch", gap: 1 }}>
						<Button
							type="submit"
							variant="contained"
							disabled={status === "loading" || !date || !time}
							fullWidth
						>
							{status === "loading" ? "Envoi…" : "Confirmer le rendez‑vous"}
						</Button>
						{status === "success" && (
							<Typography color="success.main" variant="body2" textAlign="center">
								Votre rendez‑vous a été enregistré ! Un e‑mail de confirmation vous a été envoyé.
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
		</motion.div>
	);
}
