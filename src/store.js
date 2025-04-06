export const initialStore = () => {
  const storedData = localStorage.getItem('starWarsData');  // Verificar si hay datos guardados en Local Storage
  const parsedData = storedData ? JSON.parse(storedData) : null;  // Si hay datos, parsearlos, si no, null
  

  return {
    films: {
      data: parsedData ? parsedData.films : [], 
      isLoading: false,
    },
    people: {
      data: parsedData ? parsedData.people : [],  // Si hay datos en Local Storage, usarlos,
      isLoading: false,
    },
    planets: {
      data: parsedData ? parsedData.planets : [],  // Si hay datos en Local Storage, usarlos,
      isLoading: false,
    },
    species: {
      data: parsedData ? parsedData.species : [],  // Si hay datos en Local Storage, usarlos,
      isLoading: false,
    },
    starships: {
      data: parsedData ? parsedData.starships : [],  // Si hay datos en Local Storage, usarlos,
      isLoading: false,
    },
    vehicles: {
      data: parsedData ? parsedData.vehicles : [],  // Si hay datos en Local Storage, usarlos,
      isLoading: false,
    },
  };
};

export default function storeReducer(store, action = {}) {
    switch (action.type) {
        case 'setLoading':
      return {
        ...store,
        [action.category]: {
          ...store[action.category],
          isLoading: true,
        },
      };
    case 'setData':
      return {
        ...store,
        [action.category]: {
          data: action.data,
          isLoading: false,
        },
      };
      case "ADD_FAVORITE":
        const updatedFavorites = [...store.favorites.data, action.payload]; // Agregamos el nuevo favorito en el array de favorites.data
        
        const updatedStateAdd = {
          ...store,
          favorites: { 
            data: updatedFavorites, // Aseguramos que favorites tenga data como un array
            isLoading: false // Y un estado de isLoading también como las otras categorías
          },
        };
      
        // Actualizamos localStorage para guardar la estructura correcta
        localStorage.setItem("starWarsData", JSON.stringify(updatedStateAdd));
      
        return updatedStateAdd;
  
        case "REMOVE_FAVORITE":
          const { [action.payload.id]: _, ...updatedFavoritesRemove } = store.favorites.data; // Desestructuramos y eliminamos la clave correspondiente al id
          const updatedStateRemove = { ...store, favorites: { data: updatedFavoritesRemove } };
          localStorage.setItem("starWarsData", JSON.stringify(updatedStateRemove));
          return updatedStateRemove;
          
    
    default:
      throw Error('Unknown action.');
  }
}
