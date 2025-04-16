import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Card } from "../components/Card.jsx";


export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	return (
		<div className="text-center mt-5">
			<div className="container py-4">
				<h2 className="text-start">Characters</h2>
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
				<h2 className="text-start">Planets</h2>
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
				<h2 className="text-start">Species</h2>
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
				<h2 className="text-start">Starships</h2>
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
				<h2 className="text-start">Vehicles</h2>
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