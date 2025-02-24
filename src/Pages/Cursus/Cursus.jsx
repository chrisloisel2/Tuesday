import { useState, useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import { SunburstChart } from "echarts/charts";
import { TooltipComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { motion } from "framer-motion";
import { FaCode } from "react-icons/fa";
import { useSelector } from "react-redux";

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
						a.depth - b.depth || (a.order ?? a.dataIndex) - (b.order ?? b.dataIndex),
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
						{ r0: "36%", r: "60%" },
						{ r0: "61%", r: "85%" },
						{
							r0: "86%",
							r: "95%",
							itemStyle: {
								shadowBlur: 80,
								shadowColor: colors[0],
							},
							label: {
								position: "outside",
								textShadowBlur: 5,
								textShadowColor: "#333",
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

function CursusPage() {
	const [selectedCursus, setSelectedCursus] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const cursus = useSelector((state) => state.front.cursus);

	const filteredCursus = cursus.filter((c) =>
		c.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-y-auto px-12 pt-12 flex flex-col items-center justify-center space-y-8 font-sans">
			{!selectedCursus ? (
				<div className="flex flex-col md:flex-row gap-12 w-full h-full max-w-7xl">
					<motion.div
						className="flex flex-col gap-12 p-12 w-full  h-full md:w-2/5 bg-[#1A2B3C] scrollbar-thin scrollbar-thumb-[#AEEFFF] scrollbar-track-[#1A2B3C] rounded-3xl shadow-2xl overflow-y-auto max-h-[80vh]"
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
							Découvrez notre large gamme de cursus, classés selon leur domaine d'expertise.
						</p>
						<ul className="flex flex-col gap-4 text-lg font-medium text-[#AEEFFF]">
							<li>🌟 Développement Web</li>
							<li>🌟 Intelligence Artificielle</li>
							<li>🌟 Big Data</li>
							<li>🌟 DevOps</li>
							<li>🌟 Sécurité Informatique</li>
						</ul>
					</motion.div>

					<div className="flex flex-col gap-12 bg-[#1A2B3C]  h-full p-12 scrollbar-thin scrollbar-thumb-[#AEEFFF] scrollbar-track-[#1A2B3C] rounded-3xl shadow-2xl overflow-y-auto max-h-[80vh] w-full md:w-3/5">
						{filteredCursus.map((cursus) => (
							<CursusOverview
								key={cursus.id}
								title={cursus.title}
								description={cursus.description}
								icon={FaCode}
								onClick={() => setSelectedCursus(cursus)}
							/>
						))}
					</div>
				</div>
			) : (
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="w-full max-w-7xl"
				>
					<div className="flex flex-row items-center gap-12 fade-in pt-12">
						<button
							className="bg-[#AEEFFF] text-gray-900 rounded-3xl px-8 py-3 text-lg shadow-xl hover:bg-[#E8F9FF] transition"
							onClick={() => setSelectedCursus(null)}
						>
							Retour
						</button>
						<h2 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#AEEFFF] to-[#4AB3E2]">
							{selectedCursus.title}
						</h2>
					</div>
					<SunburstDiagram id={selectedCursus.id} data={selectedCursus.data} />
				</motion.div>
			)}
		</div>
	);
}

export default CursusPage;
