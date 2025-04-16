import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useFavorites } from "../hooks/favoriteReducer";


export const Card = ({ name, gender, hairColor, eyeColor, id, type, typeImage }) => {

    const { store, dispatch: globalReducer } = useGlobalReducer();
    const { state, dispatch: favoriteReducer } = useFavorites();

    const imageUrl = `https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/${typeImage}/${id}.jpg`;

    const fallbackImage = "https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/placeholder.jpg";

    const handleError = (e) => {
        e.target.src = fallbackImage;
    };

    
    const handleFavorite = (e) => {
        e.stopPropagation();
        const character = { id, name };
        favoriteReducer({ type: "addFavorite", payload: character });  // Despachar al contexto de favoritos
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
                <p>{gender ? `Gender: ${gender}` : null}</p>
                <p>{hairColor ? `Hair color: ${hairColor}` : null}</p>
                <p>{eyeColor ? `Eye color: ${eyeColor}` : null}</p>
                <div className="d-flex justify-content-between">
                <Link to={`/single/${id}/${type}/${typeImage}`}>
                    <a href="#" className="btn btn-primary">More details</a>
                </Link>
                <button 
                  className="btn btn-warning" 
                  onClick={(e) => handleFavorite(e)}
                >
                  ♡
                </button>
                </div>
            </div>
        </div>
    )
}