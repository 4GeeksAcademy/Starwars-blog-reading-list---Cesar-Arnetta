export const initialFavoritesState = () => {
    const storedData = localStorage.getItem('starWarsFavorites');  // Verificar si hay datos guardados en Local Storage
    const parsedData = storedData ? JSON.parse(storedData) : null;  // Si hay datos, parsearlos, si no, null

    return {
        favorites: parsedData ? parsedData.favorites : [],  // Cargar los favoritos desde Local Storage o vacío
    };
};

export const favoritesReducer = (state = initialFavoritesState(), action) => {
    switch (action.type) {
        // ya no es necesario el caso addFavorite, porque se agrega el caso toggle favorite, es una fusión de este
        // junto con el remove especialmente nevcesario para que el boton pueda hacer ambos despachos con un solo caso
        // case "addFavorite":
        //     // evita los duplicados al añadir
        //     if (state.favorites.some(fav => fav.id === action.payload.id)) {
        //         return state;
        //     }
        //     // Crear un nuevo favorito con un identificador único (uid)
        //     const newFavorite = {
        //         ...action.payload,
        //         uid: new Date().getTime(), // Generamos un uid único con el timestamp (hora actual)
        //     };
        //     const newFavoritesState = {
        //         ...state,
        //         favorites: [...state.favorites, newFavorite], // Agregar el nuevo favorito con uid
        //     };

        //     // Actualizar el localStorage con los nuevos favoritos
        //     localStorage.setItem('starWarsFavorites', JSON.stringify(newFavoritesState));
        //     return newFavoritesState;

        case "removeFavorite":
            // Eliminar solo el favorito con el id específico
            const updatedFavorites = state.favorites.filter(fav => fav.id !== action.payload.id);

            const updatedState = {
                ...state,
                favorites: updatedFavorites,
            };

            // Actualizar el localStorage después de eliminar el favorito
            localStorage.setItem('starWarsFavorites', JSON.stringify(updatedState));
            return updatedState;

        case "toggleFavorite":
            const exists = state.favorites.some(fav => fav.id === action.payload.id);
            let toggledState;

            if (exists) {
                toggledState = {
                    ...state,
                    favorites: state.favorites.filter(fav => fav.id !== action.payload.id),
                };
            } else {
                const newToggleFavorite = {
                    ...action.payload,
                    uid: action.payload.id, // uid se iguala al id único
                };
                toggledState = {
                    ...state,
                    favorites: [...state.favorites, newToggleFavorite],
                };
            }

            localStorage.setItem('starWarsFavorites', JSON.stringify(toggledState));
            return toggledState;


        default:
            return state;
    }
};
