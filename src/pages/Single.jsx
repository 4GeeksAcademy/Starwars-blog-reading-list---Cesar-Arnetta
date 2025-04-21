// Import necessary hooks and components from react-router-dom and other libraries.
import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import PropTypes from "prop-types";  // To define prop types for this component
import useGlobalReducer from "../hooks/useGlobalReducer";  // Import a custom hook for accessing the global state

// Define and export the Single component which displays individual item details.
export const Single = () => {
  const { id, type, typeImage } = useParams();  // Obtenemos los parámetros de la URL
  const { store } = useGlobalReducer();
  
  const resourceFields = {
    people: [
        { label: "Gender", key: "gender" },
        { label: "Hair Color", key: "hair_color" },
        { label: "Eye Color", key: "eye_color" },
        { label: "Skin Color", key: "skin_color" },
        { label: "Height", key: "height" },
        { label: "Birth Year", key: "birth_year" },
    ],
    planets: [
        { label: "Climate", key: "climate" },
        { label: "Terrain", key: "terrain" },
        { label: "Population", key: "population" },
        { label: "Gravity", key: "gravity" },
        { label: "Diameter", key: "diameter" },
        { label: "Rotation Period", key: "rotation_period" },
    ],
    starships: [
        { label: "Model", key: "model" },
        { label: "Manufacturer", key: "manufacturer" },
        { label: "Cost", key: "cost_in_credits" },
        { label: "Crew", key: "crew" },
        { label: "Passengers", key: "passengers" },
        { label: "Starship Class", key: "starship_class" },
    ],
    species: [
        { label: "Average Height", key: "average_height" },
        { label: "Average Lifespan", key: "average_lifespan" },
        { label: "Classification", key: "classification" },
        { label: "Designation", key: "designation" },
        { label: "Eye Colors", key: "eye_colors" },
        { label: "Hair Colors", key: "hair_colors" },
    ],
    vehicles: [
        { label: "Cargo Capacity", key: "cargo_capacity" },
        { label: "Consumables", key: "consumables" },
        { label: "Cost_In_Credits", key: "cost_in_credits" },
    ],
};

// Esta variable simplifica todas las demás líneas de código

const singleItem = store[type]?.data.find(item => item.result.uid === id);


  // // Dependiendo del tipo, buscamos en la sección correspondiente del estado global
  // let singleItem = null;
  // if (type === "people") {
  //   singleItem = store.people.data.find(item => item.result.uid === id);
  // } else if (type === "planets") {
  //   singleItem = store.planets.data.find(item => item.result.uid === id);
  // } else if (type === "species") {
  //   singleItem = store.species.data.find(item => item.result.uid === id);
  // } else if (type === "starships") {
  //   singleItem = store.starships.data.find(item => item.result.uid === id);
  // } else if (type === "vehicles") {
  //   singleItem = store.vehicles.data.find(item => item.result.uid === id);
  // }

  if (!singleItem) {
    return <div>No se encontró el elemento.</div>;
  }

  const imageUrl = `https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/${typeImage}/${id}.jpg`;

  const fallbackImage = "https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/placeholder.jpg";

  const handleError = (e) => {
    e.target.src = fallbackImage;
  };

  return (
    <>
      <div className="p-5 mb-4 bg-body-tertiary rounded-3">
        <div className="row m-2 p-2 text-start border border-danger">
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            <img
              style={{ objectFit: "contain", objectPosition: "center", height: "20rem" }}
              src={imageUrl}
              onError={handleError}
              className="card-img-top"
              alt={`${typeImage}/${id}`}
            />
          </div>
          <div className="col-md-8">
            <h1 className="display-5 fw-bold">{singleItem.result.properties.name}</h1>
            <p className="col fs-4">{singleItem.result.description || "Don't have a description"}</p>
          </div>
        </div>

        {/* Campos con cambios dinámicos */}
        <div className="container">
          <div className="row m-2 p-2 text-center border border-danger">
            {resourceFields[type]?.map(field => {
              const value = singleItem.result.properties[field.key];
              return (
                <div className="col-md-2 d-flex align-items-center justify-content-center" key={field.key}>
                  <p className="mb-0">{field.label}: {value || "N/A"}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>

  // antes se estaba usando de forma estática
    //       <div className="cointainer">
    //         <div className="row m-2  p-2 text-center border border-danger">
    //           <div className="col-md-2 d-flex align-items-center justify-content-center">
    //             <p className="mb-0">Gender: {singleItem.result.properties.gender ? singleItem.result.properties.gender : "N/A"}</p>
    //           </div>
    //           <div className="col-md-2 d-flex align-items-center justify-content-center">
    //             <p className="mb-0">Hair Color: {singleItem.result.properties.hair_color ? singleItem.result.properties.hair_color : "N/A"}</p>
    //           </div>
    //           <div className="col-md-2 d-flex align-items-center justify-content-center">
    //             <p className="mb-0">Eye Color: {singleItem.result.properties.eye_color ? singleItem.result.properties.eye_color : "N/A"}</p>
    //           </div>
    //           <div className="col-md-2 d-flex align-items-center justify-content-center">
    //             <p className="mb-0">Skin Color: {singleItem.result.properties.skin_color ? singleItem.result.properties.skin_color : "N/A"}</p>
    //           </div>
    //           <div className="col-md-2 d-flex align-items-center justify-content-center">
    //             <p className="mb-0">Height: {singleItem.result.properties.height ? singleItem.result.properties.height : "N/A"}</p>
    //           </div>
    //           <div className="col-md-2 d-flex align-items-center justify-content-center">
    //             <p className="mb-0">Birth Year: {singleItem.result.properties.birth_year ? singleItem.result.properties.birth_year : "N/A"}</p>
    //           </div>
    //         </div>
    //       </div>
    //   </div>
    // </>
  );
};

// Use PropTypes to validate the props passed to this component, ensuring reliable behavior.
Single.propTypes = {
  // Although 'match' prop is defined here, it is not used in the component.
  // Consider removing or using it as needed.
  match: PropTypes.object
};
