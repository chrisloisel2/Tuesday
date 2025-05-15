import { useState, useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import { SunburstChart } from "echarts/charts";
import { TooltipComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { motion } from "framer-motion";
import { FaCode } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchCursus } from "../../Redux/FrontReducer";
import { useNavigate } from "react-router-dom";

echarts.use([SunburstChart, TooltipComponent, CanvasRenderer]);

const colors = ["#FFAE57", "#FF7853", "#EA5151", "#CC3F57", "#9A2555"];
const bgColor = "#2E2733";

function SunburstDiagram({ id, data }) {
	const chartRef = useRef(null);

	useEffect(() => {
		if (!chartRef.current) return;
		const myChart = echarts.init(chartRef.current);

		const option = {
			backgroundColor: "transparent",
			color: colors,
			series: [
				{
					type: "sunburst",
					center: ["50%", "48%"],
					data: data.children || [],
					sort: (a, b) =>
						a.depth - b.depth ||
						(a.order ?? a.dataIndex) - (b.order ?? b.dataIndex),
					radius: [0, "95%"],
					label: {
						rotate: "radial",
						color: bgColor,
						fontFamily: "Inter, sans-serif",
					},
					itemStyle: {
						borderColor: bgColor,
						borderWidth: 2,
					},
					levels: [
						{ r0: "0%", r: "10%", itemStyle: { borderWidth: 2 } },
						{ r0: "12%", r: "35%", label: { rotate: 0 } },
						{ r0: "36%", r: "60%", label: { rotate: 0 } },
						{ r0: "61%", r: "85%", label: { rotate: 0 } },
						{
							r0: "86%",
							r: "90%",
							itemStyle: {
								shadowBlur: 80,
								shadowColor: colors[0],
							},
							label: {
								position: "outside",
								textShadowBlur: 5,
								textShadowColor: "#333",
								color: "white",
								formatter: `{b}`,
							},
							downplay: {
								label: {
									opacity: 0.5,
								},
							},
						},
					],
				},
			],
		};

		myChart.setOption(option);
		myChart.on("click", (params) => {
			if (params.data.link) window.open(params.data.link, "_blank");
		});

		const resizeObserver = new ResizeObserver(() => myChart.resize());
		resizeObserver.observe(chartRef.current);

		return () => {
			myChart.dispose();
			resizeObserver.disconnect();
		};
	}, [data]);

	return <div ref={chartRef} className="w-full h-[900px]" />;
}

function CursusOverview({ title, description, icon: Icon, onClick }) {
	return (
		<motion.div
			whileHover={{ scale: 1.05 }}
			className="flex flex-col bg-[#1A2B3C] p-8 rounded-3xl shadow-2xl space-y-4 cursor-pointer transition-all hover:shadow-3xl"
			onClick={onClick}
		>
			<Icon className="text-[#AEEFFF] text-4xl" />
			<h2 className="text-3xl font-bold text-[#AEEFFF] font-sans">{title}</h2>
			<p className="text-lg leading-relaxed text-gray-300">{description}</p>
		</motion.div>
	);
}

function Cursus() {
	const dispatch = useDispatch();
	const [searchTerm, setSearchTerm] = useState("");
	const cursus = useSelector((state) => state.front.cursus.data);
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchCursus());
	}, [dispatch]);

	const filteredCursus = cursus.filter((c) =>
		c.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-y-auto px-12 pt-12 flex flex-col items-center justify-center space-y-8 font-sans">
			<div className="flex flex-col md:flex-row gap-10 w-full h-full max-w-[85vw]">
				<motion.div
					className="flex flex-col gap-12 p-12 w-full md:w-2/5 bg-[#1A2B3C] scrollbar-thin scrollbar-thumb-[#AEEFFF] scrollbar-track-[#1A2B3C] rounded-3xl shadow-2xl overflow-y-auto h-[85vh]"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1 }}
				>
					<h2 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#AEEFFF] to-[#4AB3E2]">
						Cherchez le cursus qui vous convient
					</h2>
					<input
						type="text"
						placeholder="Rechercher un cursus"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="p-4 text-[black] rounded-lg placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#AEEFFF] transition w-full"
					/>
					<p className="text-lg leading-relaxed text-gray-300">
						Découvrez notre large gamme de cursus, classés selon leur domaine
						d'expertise.
					</p>
					<ul className="flex flex-col gap-5 text-lg font-medium text-[#AEEFFF]">
						<button
							onClick={
								() => {
									if (searchTerm === "Développement Web")
										setSearchTerm("")
									else
										setSearchTerm("Développement Web")
								}
							}
							className="bg-[#AEEFFF] text-gray-900 rounded-3xl px-8 py-3 text-lg shadow-xl hover:bg-[#E8F9FF] transition"
						>Développement Web</button>
						<button
							onClick={
								() => {
									if (searchTerm === "Intelligence Artificielle")
										setSearchTerm("")
									else
										setSearchTerm("Intelligence Artificielle")
								}
							}
							className="bg-[#AEEFFF] text-gray-900 rounded-3xl px-8 py-3 text-lg shadow-xl hover:bg-[#E8F9FF] transition"
						>Intelligence Artificielle</button>
						<button
							onClick={
								() => {
									if (searchTerm === "Big Data")
										setSearchTerm("")
									else
										setSearchTerm("Big Data")
								}
							}
							className="bg-[#AEEFFF] text-gray-900 rounded-3xl px-8 py-3 text-lg shadow-xl hover:bg-[#E8F9FF] transition"
						>Big Data</button>
						<button
							onClick={
								() => {
									if (searchTerm === "DevOps")
										setSearchTerm("")
									else
										setSearchTerm("DevOps")
								}
							}
							className="bg-[#AEEFFF] text-gray-900 rounded-3xl px-8 py-3 text-lg shadow-xl hover:bg-[#E8F9FF] transition"
						>DevOps</button>
						<button
							onClick={
								() => {
									if (searchTerm === "Cybersécurité")
										setSearchTerm("")
									else
										setSearchTerm("Cybersécurité")
								}
							}
							className="bg-[#AEEFFF] text-gray-900 rounded-3xl px-8 py-3 text-lg shadow-xl hover:bg-[#E8F9FF] transition"
						>Cybersécurité</button>
					</ul>
				</motion.div>

				<div className="flex flex-col gap-12 bg-[#1A2B3C]   p-12 scrollbar-thin scrollbar-thumb-[#AEEFFF] scrollbar-track-[#1A2B3C] rounded-3xl shadow-2xl overflow-y-auto h-[85vh] w-full md:w-4/5">
					{filteredCursus.map((cursus) => (
						<CursusOverview
							key={cursus.id}
							title={cursus.title}
							description={cursus.description}
							icon={FaCode}
							onClick={() => navigate(`/cursus/${cursus._id}`)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default Cursus;
