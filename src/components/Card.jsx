import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useFavorites } from "../hooks/favoriteReducer";


export const Card = ({ name, id, uid, type, typeImage }) => {

    const { store, dispatch: globalReducer } = useGlobalReducer();
    const { state, dispatch: favoriteReducer } = useFavorites();

    // esto determina si el corazón ya ha sido marcado como favorito es una varible que detecta si el fav ha sido seleccionado,
    // con respecto al id
    const isFavorite = state.favorites.some(fav => fav.id === uid);

    //estos obejetos permiten añadir los parametros de forma sencilla y controlada 
    const resourceFields = {
        people: [
            { label: "Gender", key: "gender" },
            { label: "Hair Color", key: "hair_color" },
            { label: "Eye Color", key: "eye_color" },
        ],
        planets: [
            { label: "Climate", key: "climate" },
            { label: "Terrain", key: "terrain" },
            { label: "Population", key: "population" },
        ],
        starships: [
            { label: "Model", key: "model" },
            { label: "Manufacturer", key: "manufacturer" },
            { label: "Cost", key: "cost_in_credits" },
        ],
        species: [
            { label: "Average Height", key: "average_height" },
            { label: "Average Lifespan", key: "average_lifespan" },
            { label: "Classification", key: "classification" },
        ],
        vehicles: [
            { label: "Cargo Capacity", key: "cargo_capacity" },
            { label: "Consumables", key: "consumables" },
            { label: "Cost_In_Credits", key: "cost_in_credits" },
        ],
    };

      // Buscar el item específico por uid en el store correspondiente
  const item = store[type]?.data.find(el => el.result.uid === id);


    const imageUrl = `https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/${typeImage}/${id}.jpg`;

    const fallbackImage = "https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/placeholder.jpg";

    const handleError = (e) => {
        e.target.src = fallbackImage;
    };


    const handleFavorite = (e) => {
        e.stopPropagation();
        favoriteReducer({ type: "toggleFavorite", payload: { id: uid, name } });  // Despachar al contexto de favoritos
    };


    return (
        <div className="card" style={{ flexShrink: "0", width: "18rem" }}>
            <img
                style={{ objectFit: "cover", objectPosition: "center", width: "18rem", height: "20rem" }}
                src={imageUrl}
                onError={handleError}
                className="card-img-top" alt={`${typeImage}/${id}`} />
            <div className="card-body text-start">
                <h2 className="card-title">{name}</h2>
                {resourceFields[type]?.map(field => {
                    const value = item?.result.properties[field.key];
                    return value ? <p key={field.key}>{field.label}: {value}</p> : null;
                })}
                {/* uso de campos estáticos cambiados a campos dinámicos en las líneas de arriba <p>{gender ? `Gender: ${gender}` : null}</p>
                <p>{hairColor ? `Hair color: ${hairColor}` : null}</p>
                <p>{eyeColor ? `Eye color: ${eyeColor}` : null}</p> */}
                <div className="d-flex justify-content-between">
                    <Link to={`/single/${id}/${type}/${typeImage}`}>
                        <a href="#" className="btn btn-primary">More details</a>
                    </Link>
                    <button
                        className="btn btn-warning"
                        onClick={(e) => handleFavorite(e)}
                    >
                        {isFavorite ? "❤️" : "🤍"}
                    </button>
                </div>
            </div>
        </div>
    )
}