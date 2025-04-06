// Import necessary hooks and components from react-router-dom and other libraries.
import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import PropTypes from "prop-types";  // To define prop types for this component
import rigoImageUrl from "../assets/img/rigo-baby.jpg"  // Import an image asset
import useGlobalReducer from "../hooks/useGlobalReducer";  // Import a custom hook for accessing the global state

// Define and export the Single component which displays individual item details.
export const Single = () => {
  const { id, type, typeImage } = useParams();  // Obtenemos los parámetros de la URL
  const { store } = useGlobalReducer();
  

  // Dependiendo del tipo, buscamos en la sección correspondiente del estado global
  let singleItem = null;
  if (type === "people") {
    singleItem = store.people.data.find(item => item.result.uid === id);
  } else if (type === "planets") {
    singleItem = store.planets.data.find(item => item.result.uid === id);
  } else if (type === "species") {
    singleItem = store.species.data.find(item => item.result.uid === id);
  } else if (type === "starships") {
    singleItem = store.starships.data.find(item => item.result.uid === id);
  } else if (type === "vehicles") {
    singleItem = store.vehicles.data.find(item => item.result.uid === id);
  }

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
          <div className="row m-2  p-2 text-start border border-danger">
          <div className="col-md-4 d-flex align-items-center justify-content-center">
          <img
                    style={{objectFit: "contain", objectPosition: "center", height:"20rem"}}
                    src={imageUrl} 
                    onError={handleError}
                    className="card-img-top" alt={`${typeImage}/${id}`} />
          </div>
            <div className="col-md-8">
              <h1 className="display-5 fw-bold">{singleItem.result.properties.name}</h1>
              <p className="col fs-4">{singleItem.result.description ? singleItem.result.description : "Don't have a description"}</p>
            </div>
          </div>
          <div className="cointainer">
            <div className="row m-2  p-2 text-center border border-danger">
              <div className="col-md-2 d-flex align-items-center justify-content-center">
                <p className="mb-0">Gender: {singleItem.result.properties.gender ? singleItem.result.properties.gender : "N/A"}</p>
              </div>
              <div className="col-md-2 d-flex align-items-center justify-content-center">
                <p className="mb-0">Hair Color: {singleItem.result.properties.hair_color ? singleItem.result.properties.hair_color : "N/A"}</p>
              </div>
              <div className="col-md-2 d-flex align-items-center justify-content-center">
                <p className="mb-0">Eye Color: {singleItem.result.properties.eye_color ? singleItem.result.properties.eye_color : "N/A"}</p>
              </div>
              <div className="col-md-2 d-flex align-items-center justify-content-center">
                <p className="mb-0">Skin Color: {singleItem.result.properties.skin_color ? singleItem.result.properties.skin_color : "N/A"}</p>
              </div>
              <div className="col-md-2 d-flex align-items-center justify-content-center">
                <p className="mb-0">Height: {singleItem.result.properties.height ? singleItem.result.properties.height : "N/A"}</p>
              </div>
              <div className="col-md-2 d-flex align-items-center justify-content-center">
                <p className="mb-0">Birth Year: {singleItem.result.properties.birth_year ? singleItem.result.properties.birth_year : "N/A"}</p>
              </div>
            </div>
          </div>
          <button className="btn btn-primary btn-lg" type="button">Example button</button>
      </div>
    </>
  );
};

// Use PropTypes to validate the props passed to this component, ensuring reliable behavior.
Single.propTypes = {
  // Although 'match' prop is defined here, it is not used in the component.
  // Consider removing or using it as needed.
  match: PropTypes.object
};
