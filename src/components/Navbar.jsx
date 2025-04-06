

import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/favoriteReducer";


export const Navbar = () => {
  const { state, dispatch } = useFavorites();  // Usa el contexto de favoritos

  console.log(state);
  

  const handleRemoveFavorite = (favorite, e) => {
	e.stopPropagation()
    dispatch({ type: "REMOVE_FAVORITE", payload: { uid: favorite.uid } }); // Elimina solo el favorito con el uid específico
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
	   <div className="container"> 
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Star Wars</span>
        </Link>

        {/* Botón para expandir la navegación en dispositivos pequeños */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenedor para los elementos del menú */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Favorites ({state.favorites.length > 0 ? state.favorites.length : 0})
              </button>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {state.favorites.length > 0 ? (
                  state.favorites.map((fav) => (
                    <li key={fav.id}>
                      <div className="dropdown-item d-flex justify-content-between">
                        <span>{fav.name}</span>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={(e) => handleRemoveFavorite(fav, e)}
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <li><span className="dropdown-item">No favorites added yet.</span></li>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
