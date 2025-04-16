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
    default:
      throw Error('Unknown action.');
  }
}
