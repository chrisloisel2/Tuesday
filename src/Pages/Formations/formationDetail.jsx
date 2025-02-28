import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getFormationByCustomId } from "../../Redux/FrontReducer";

const FormationDetailPage = () => {
	const { customId } = useParams();
	const formation = useSelector((state) => state.front.formations.selectedFormation);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getFormationByCustomId(customId));
	}, [customId]);


	if (formation == undefined || !formation) {
		return <div className="text-center text-gray-600 text-lg">Chargement...</div>;
	}

	return (
		<div className="max-w-4xl  mx-auto p-6 h-screen overflow-y-auto flex flex-col items-center space-y-6  pt-[10vh]">
			<h1 className="text-4xl font-bold text-center mb-6">{formation.title}</h1>
			<img src={formation.image} alt={formation.title} className="w-full h-60 object-cover rounded-lg mb-6" />
			<p className="text-gray-700 text-lg mb-4">{formation.description}</p>
			<div className="flex items-center mb-4">
				<span className="text-yellow-500 text-lg">⭐ {formation.rating}/5</span>
			</div>
			<p className="text-xl font-bold text-blue-600 mb-4">Prix: {formation.price} €</p>
			<a href={formation.link} className="block w-full bg-blue-600 text-white py-3 px-6 rounded text-center hover:bg-blue-700">S'inscrire</a>
			<div className="mt-6">
				<h2 className="text-2xl font-semibold mb-3">Compétences abordées :</h2>
				<ul className="list-disc list-inside text-gray-700">
					{formation.children.map((skill, index) => (
						<li key={index} className="ml-2 font-medium">{skill.name} ({skill.value}/5)</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default FormationDetailPage;
