export const initialFavoritesState = () => {
    const storedData = localStorage.getItem('starWarsFavorites');  // Verificar si hay datos guardados en Local Storage
    const parsedData = storedData ? JSON.parse(storedData) : null;  // Si hay datos, parsearlos, si no, null

    return {
        favorites: parsedData ? parsedData.favorites : [],  // Cargar los favoritos desde Local Storage o vacío
    };
};

export const favoritesReducer = (state = initialFavoritesState(), action) => {
    switch (action.type) {
        case "ADD_FAVORITE":
            // Crear un nuevo favorito con un identificador único (uid)
            const newFavorite = {
              ...action.payload,
              uid: new Date().getTime(), // Generamos un uid único con el timestamp (hora actual)
            };
            const newFavoritesState = {
                ...state,
                favorites: [...state.favorites, newFavorite], // Agregar el nuevo favorito con uid
            };

            // Actualizar el localStorage con los nuevos favoritos
            localStorage.setItem('starWarsFavorites', JSON.stringify(newFavoritesState));
            return newFavoritesState;
      
            case "REMOVE_FAVORITE":
                // Eliminar solo el favorito con el uid específico
                const updatedFavorites = state.favorites.filter(fav => fav.uid !== action.payload.uid);
    
                const updatedState = {
                    ...state,
                    favorites: updatedFavorites,
                };
    
                // Actualizar el localStorage después de eliminar el favorito
                localStorage.setItem('starWarsFavorites', JSON.stringify(updatedState));
                return updatedState;
    
            default:
                return state;
            }
};
