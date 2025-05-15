import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaStar, FaFilePdf, FaArrowLeft } from "react-icons/fa";
import { usePDF } from "react-to-pdf";

function flattenSkills(nodes = []) {
	const list = [];
	nodes.forEach((n) => {
		if (n.name) list.push(n.name);
		if (Array.isArray(n.children)) list.push(...flattenSkills(n.children));
	});
	return list;
}

export default function CursusPage() {
	const { id } = useParams();
	const { toPDF, targetRef } = usePDF({ filename: "programme-formation.pdf" });
	const { data = [], loading, error } = useSelector((state) => state.front.cursus);
	const cursus = data.find((c) => c._id === id);

	if (loading)
		return (
			<section className="min-h-screen flex items-center justify-center bg-[#0B1220] text-slate-300">
				<p>Chargement du cursus…</p>
			</section>
		);

	if (error)
		return (
			<section className="min-h-screen flex items-center justify-center bg-[#0B1220] text-red-400">
				<p>Erreur : {error}</p>
			</section>
		);

	if (!cursus)
		return (
			<section className="min-h-screen flex items-center justify-center bg-[#0B1220] text-slate-300">
				<p>Cursus introuvable.</p>
			</section>
		);

	const {
		title,
		description,
		rating = 0,
		data: { children: modules = [] } = {},
	} = cursus;

	const skills = flattenSkills(modules);

	return (
		<section className="min-h-screen bg-[#0B1220] text-slate-200 py-12 px-4 sm:px-6">
			<div className="max-w-5xl mx-auto grid gap-8">
				{/* Bouton retour */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2 }}
				>
					<Link
						to="/formations"
						className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
					>
						<FaArrowLeft className="text-sm" />
						<span>Retour aux formations</span>
					</Link>
				</motion.div>

				{/* HEADER */}
				<motion.header
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center"
					ref={targetRef}
				>
					<h1 className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-4">
						{title}
					</h1>
					<p className="mx-auto max-w-3xl text-base sm:text-lg leading-relaxed text-slate-300 mb-6">
						{description}
					</p>

					<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
						{skills.length > 0 && (
							<ul className="flex flex-wrap justify-center gap-2">
								{skills.slice(0, 5).map((skill) => (
									<li
										key={skill}
										className="px-3 py-1 text-xs rounded-full bg-white/10 text-slate-200 backdrop-blur-sm"
									>
										{skill}
									</li>
								))}
							</ul>
						)}

						<div className="flex items-center gap-4">
							<div className="flex space-x-1">
								{[...Array(5)].map((_, i) => (
									<FaStar
										key={i}
										className={`text-lg ${i < rating ? "text-amber-400" : "text-slate-600"}`}
									/>
								))}
							</div>
							<button
								onClick={toPDF}
								className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors text-sm"
							>
								<FaFilePdf className="text-cyan-400" />
								<span>Exporter le programme</span>
							</button>
						</div>
					</div>
				</motion.header>

				{/* PROGRAMME DÉTAILLÉ */}
				{modules.length > 0 && (
					<section className="mt-8">
						<h2 className="text-2xl font-semibold text-cyan-300 mb-6">
							Programme détaillé
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{modules.map((mod, idx) => (
								<motion.div
									key={mod._id?.$oid ?? idx}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ delay: idx * 0.05 }}
									viewport={{ once: true }}
									className="bg-slate-800/50 rounded-xl p-5 backdrop-blur-sm border border-slate-700/50"
								>
									<h3 className="text-lg font-semibold text-slate-100 mb-3 flex items-center gap-2">
										<span className="text-cyan-400 font-mono text-sm">
											{String(idx + 1).padStart(2, "0")}.
										</span>
										{mod.name}
									</h3>

									{Array.isArray(mod.children) && (
										<ul className="space-y-2">
											{mod.children.map((sub) => (
												<li
													key={sub._id?.$oid ?? sub.name}
													className="text-sm text-slate-300 pl-6 relative"
												>
													<div className="absolute left-2 top-2 w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
													{sub.name}
													{sub.children && (
														<ul className="mt-2 space-y-1 pl-4">
															{sub.children.map((subsub) => (
																<li
																	key={subsub._id?.$oid ?? subsub.name}
																	className="text-xs text-slate-400 pl-4 relative before:absolute before:left-0 before:top-2 before:w-2 before:h-px before:bg-slate-500"
																>
																	{subsub.name}
																</li>
															))}
														</ul>
													)}
												</li>
											))}
										</ul>
									)}
								</motion.div>
							))}
						</div>
					</section>
				)}

				{/* CTA */}
				<motion.div
					initial={{ scale: 0.9, opacity: 0 }}
					whileInView={{ scale: 1, opacity: 1 }}
					transition={{ type: "spring", stiffness: 200, damping: 15 }}
					viewport={{ once: true }}
					className="mt-12 text-center"
				>
					<Link
						to={`/inscription/${id}`}
						className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-cyan-500 text-slate-900 font-semibold shadow-lg hover:bg-cyan-400 transition hover:shadow-cyan-500/20"
					>
						S'inscrire maintenant
					</Link>
				</motion.div>
			</div>
		</section>
	);
}
