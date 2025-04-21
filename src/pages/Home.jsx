import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Card } from "../components/Card.jsx";


export const Home = () => {

	const { store, dispatch } = useGlobalReducer();

	// el uso de sections permite mediante un map, renderizar toda la información, disminuyendo las líenas de código,
	// y convietiendolo en mapeo con campos dinámicos que se pueden controlar de forma sencilla
	const sections = [
		{ type: "people", typeImage: "characters", title: "Characters" },
		{ type: "planets", typeImage: "planets", title: "Planets" },
		{ type: "species", typeImage: "species", title: "Species" },
		{ type: "starships", typeImage: "starships", title: "Starships" },
		{ type: "vehicles", typeImage: "vehicles", title: "Vehicles" },
	];

	console.log(store)

	return (
		<div className="text-center mt-5">
			{sections.map(({ type, typeImage, title }) => {
				const data = store[type]?.data || [];
				return (
					<div key={type} className="container py-4">
						<h2 className="text-start">{title}</h2>
						<div className="d-flex overflow-auto gap-4" style={{ flexWrap: "nowrap" }}>
							{data.map((i) => (
								<Card
									key={i.result.uid}
									id={i.result.uid}
									uid={i.result._id}
									type={type}
									typeImage={typeImage}
									name={i.result.properties.name}
								/>
							))}
						</div>
					</div>
				);
			})}
		</div>
	);
};
// asi se añadian los mapeos con campos estaticos sections permite que las categorías se añadan de forma dinámica
//  			<div className="container py-4">
// 				<h2 className="text-start">Planets</h2>
// 				<div className="d-flex overflow-auto gap-4" style={{ flexWrap: "nowrap" }}>
// 					{store.planets.data.map((i) => {
// 						return (
// 							<Card
// 								key={i.result.uid}
// 								id={i.result.uid}
// 								uid={i.result._id}
// 								type="planets"
// 								typeImage="planets"
// 								name={i.result.properties.name}
// 								gender={i.result.properties.gender}
// 								hairColor={i.result.properties.hair_color}
// 								eyeColor={i.result.properties.eye_color}
// 							/>
// 						)
// 					})}
// 				</div>
// 			</div>
// 			<div className="container py-4">
// 				<h2 className="text-start">Species</h2>
// 				<div className="d-flex overflow-auto gap-4" style={{ flexWrap: "nowrap" }}>
// 					{store.species.data.map((i) => {
// 						return (
// 							<Card
// 								key={i.result.uid}
// 								id={i.result.uid}
// 								uid={i.result._id}
// 								type="species"
// 								typeImage="species"
// 								name={i.result.properties.name}
// 								gender={i.result.properties.gender}
// 								hairColor={i.result.properties.hair_color}
// 								eyeColor={i.result.properties.eye_color}
// 							/>
// 						)
// 					})}
// 				</div>
// 			</div>
// 			<div className="container py-4">
// 				<h2 className="text-start">Starships</h2>
// 				<div className="d-flex overflow-auto gap-4" style={{ flexWrap: "nowrap" }}>
// 					{store.starships.data.map((i) => {
// 						return (
// 							<Card
// 								key={i.result.uid}
// 								id={i.result.uid}
// 								uid={i.result._id}
// 								type="starships"
// 								typeImage="starships"
// 								name={i.result.properties.name}
// 								gender={i.result.properties.gender}
// 								hairColor={i.result.properties.hair_color}
// 								eyeColor={i.result.properties.eye_color}
// 							/>
// 						)
// 					})}
// 				</div>
// 			</div>
// 			<div className="container py-4">
// 				<h2 className="text-start">Vehicles</h2>
// 				<div className="d-flex overflow-auto gap-4" style={{ flexWrap: "nowrap" }}>
// 					{store.vehicles.data.map((i) => {
// 						return (
// 							<Card
// 								key={i.result.uid}
// 								id={i.result.uid}
// 								uid={i.result._id}
// 								type="vehicles"
// 								typeImage="vehicles"
// 								name={i.result.properties.name}
// 								gender={i.result.properties.gender}
// 								hairColor={i.result.properties.hair_color}
// 								eyeColor={i.result.properties.eye_color}
// 							/>
// 						)
// 					})}
// 				</div>
// 			</div>
// 		</div>
// 	);
// }; 