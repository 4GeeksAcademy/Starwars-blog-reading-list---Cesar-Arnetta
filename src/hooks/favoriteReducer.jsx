import React, { createContext, useReducer, useContext } from "react";
import { favoritesReducer, initialFavoritesState } from "../favoriteStore";


const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [state, dispatch] = useReducer(favoritesReducer, initialFavoritesState());

    return (
        <FavoritesContext.Provider value={{ state, dispatch }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    return useContext(FavoritesContext);
};
