export const starWarsServices = {

  // Fetch functions
  fetchStarWarsData: async (dispatch) => {
    const apiUrl = "https://www.swapi.tech/api/";
    const localStorageKey = 'starWarsData';

    try {
      // Paso 1: Despachamos que se está cargando, el local storage nos permite traer la información que posteriormente fue seteada
      // al final de esta secuencia de gets y disptachs. Si hay información la traera de forma local de una forma más rápida, porque
      // estará almacenada en e local storage del navegador. 

      const storedData = localStorage.getItem(localStorageKey);
      if (storedData) {
        const parsedData = JSON.parse(storedData);

        dispatch({ type: 'setData', category: 'films', data: parsedData.films });
        dispatch({ type: 'setData', category: 'people', data: parsedData.people });
        dispatch({ type: 'setData', category: 'planets', data: parsedData.planets });
        dispatch({ type: 'setData', category: 'species', data: parsedData.species });
        dispatch({ type: 'setData', category: 'starships', data: parsedData.starships });
        dispatch({ type: 'setData', category: 'vehicles', data: parsedData.vehicles });
        return;
      }

      // Hacemos la solicitud inicial para obtener las URLs de cada categoría
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Paso 2: Extraemos las URLs para cada categoría
      const peopleUrl = data.result.people;
      const planetsUrl = data.result.planets;
      const speciesUrl = data.result.species;
      const starshipsUrl = data.result.starships;
      const vehiclesUrl = data.result.vehicles;

      // Paso 3: Obtener los datos de las categorías usando Promise.all (otra forma de escribirlo)
      const [peopleResponse, planetsResponse, speciesResponse, starshipsResponse, vehiclesResponse] = await Promise.all([
        fetch(peopleUrl),
        fetch(planetsUrl),
        fetch(speciesUrl),
        fetch(starshipsUrl),
        fetch(vehiclesUrl),
      ]);

      const peopleData = await peopleResponse.json();
      const planetsData = await planetsResponse.json();
      const speciesData = await speciesResponse.json();
      const starshipsData = await starshipsResponse.json();
      const vehiclesData = await vehiclesResponse.json();

      // Paso 4: Obtener detalles de cada categoría
      // Creamos un array de promesas para todas las categorías, similar a people

      const peopleDetailsPromises = peopleData.results.map(person => fetch(person.url).then(res => res.json()));
      const planetsDetailsPromises = planetsData.results.map(planet => fetch(planet.url).then(res => res.json()));
      const speciesDetailsPromises = speciesData.results.map(specie => fetch(specie.url).then(res => res.json()));
      const starshipsDetailsPromises = starshipsData.results.map(starship => fetch(starship.url).then(res => res.json()));
      const vehiclesDetailsPromises = vehiclesData.results.map(vehicle => fetch(vehicle.url).then(res => res.json()));

      // Usamos Promise.all para esperar que todos los fetch de los detalles terminen
      const peopleDetails = await Promise.all(peopleDetailsPromises);
      const planetsDetails = await Promise.all(planetsDetailsPromises);
      const speciesDetails = await Promise.all(speciesDetailsPromises);
      const starshipsDetails = await Promise.all(starshipsDetailsPromises);
      const vehiclesDetails = await Promise.all(vehiclesDetailsPromises);

      const starWarsData = {
        films: [],  // No agrego peliculas, ya que contiene la misma información que las otras categorías y me parecìa interesante
        // solo mostrar lo demás
        people: peopleDetails,
        planets: planetsDetails,
        species: speciesDetails,
        starships: starshipsDetails,
        vehicles: vehiclesDetails,
      };

    // esto setea al local storage del navegador

      localStorage.setItem(localStorageKey, JSON.stringify(starWarsData));

      // Paso 5: Despachamos los datos obtenidos a la store
      dispatch({ type: 'setData', category: 'films' });
      dispatch({ type: 'setData', category: 'people', data: peopleDetails });
      dispatch({ type: 'setData', category: 'planets', data: planetsDetails });
      dispatch({ type: 'setData', category: 'species', data: speciesDetails });
      dispatch({ type: 'setData', category: 'starships', data: starshipsDetails });
      dispatch({ type: 'setData', category: 'vehicles', data: vehiclesDetails });

    } catch (error) {
      console.error("Error fetching Star Wars data:", error);
    }
  },


// How I understand the image link structure
// I use this for research for routes of a diferent link in consolre in order to get with a fetch teh categories of the images.
// Now I don't need to use this to complete the project but is a refence of where I get the link and understand the categories of
// the teacher's givin link https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/characters/1.jpg,
// for fecth it's necesary to replace in the link "raw" for "api"
// After all of that I understan the structure of the link and only need to use the link to refer an image that I want with an Id and a category

// fetchStarWarsFromGit: async () => {

//   // After doing a fecth of the link that the teacher give to us, I saw which catgeorias actually have files inside people, vechicles and species,
//   // but I need to reach the starships and planets categories 
// try {
//   const response = await fetch("https://api.github.com/repos/tbone849/star-wars-guide/contents/build/assets/img/characters");
//   console.log(response);
  
//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }

//   const data = await response.json();
//     console.log(data);
//     return data;
// } catch (error) {
//   console.log(error);
  
// }
//     }
}
