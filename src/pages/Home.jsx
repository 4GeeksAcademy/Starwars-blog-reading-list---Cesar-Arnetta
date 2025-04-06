import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { starWarsServices } from "../services/starWarsServices.js";
import { Card } from "../components/Card.jsx";
import { useEffect, useState } from "react";


export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	

// I use this for research for routes of a diferent link in consolre in order to get with a fetch teh categories of the images.
// Now I don't need to use this to complete the project but is a refence of where I get the link and understand the categories of
// the teacher's givin link https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/characters/1.jpg,
// for fecth it's necesary to replace in the link "raw" for "api" 
	// useEffect(() => {
	// 	// Llama a la función cuando el componente se monte
	// 	starWarsServices.fetchStarWarsFromGit();
	//   }, []); // El arreglo vacío asegura que solo se ejecute una vez al montarse el componente
	

	console.log(store)
	console.log(store.people.data)


	return (
		<div className="text-center mt-5">
			<div className="container py-4">
				<div className="d-flex overflow-auto gap-4" style={{ flexWrap: "nowrap" }}>
					{store.people.data.map((i) => {
						return (
							<Card
								key={i.result.uid}
								id={i.result.uid}
								type="people"
								typeImage="characters"
								name={i.result.properties.name}
								gender={i.result.properties.gender}
								hairColor={i.result.properties.hair_color}
								eyeColor={i.result.properties.eye_color}
							/>
						)
					})}
				</div>
			</div>
			<div className="container py-4">
				<div className="d-flex overflow-auto gap-4" style={{ flexWrap: "nowrap" }}>
					{store.planets.data.map((i) => {
						return (
							<Card
								key={i.result.uid}
								id={i.result.uid}
								type="planets"
								typeImage="planets"
								name={i.result.properties.name}
								gender={i.result.properties.gender}
								hairColor={i.result.properties.hair_color}
								eyeColor={i.result.properties.eye_color}
							/>
						)
					})}
				</div>
			</div>
			<div className="container py-4">
				<div className="d-flex overflow-auto gap-4" style={{ flexWrap: "nowrap" }}>
					{store.species.data.map((i) => {
						return (
							<Card
								key={i.result.uid}
								id={i.result.uid}
								type="species"
								typeImage="species"
								name={i.result.properties.name}
								gender={i.result.properties.gender}
								hairColor={i.result.properties.hair_color}
								eyeColor={i.result.properties.eye_color}
							/>
						)
					})}
				</div>
			</div>
			<div className="container py-4">
				<div className="d-flex overflow-auto gap-4" style={{ flexWrap: "nowrap" }}>
					{store.starships.data.map((i) => {
						return (
							<Card
								key={i.result.uid}
								id={i.result.uid}
								type="starships"
								typeImage="starships"
								name={i.result.properties.name}
								gender={i.result.properties.gender}
								hairColor={i.result.properties.hair_color}
								eyeColor={i.result.properties.eye_color}
							/>
						)
					})}
				</div>
			</div>
			<div className="container py-4">
				<div className="d-flex overflow-auto gap-4" style={{ flexWrap: "nowrap" }}>
					{store.vehicles.data.map((i) => {
						return (
							<Card
								key={i.result.uid}
								id={i.result.uid}
								type="vehicles"
								typeImage="vehicles"
								name={i.result.properties.name}
								gender={i.result.properties.gender}
								hairColor={i.result.properties.hair_color}
								eyeColor={i.result.properties.eye_color}
							/>
						)
					})}
				</div>
			</div>
		</div>
	);
}; 