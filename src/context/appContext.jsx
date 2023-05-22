import { useState, useEffect, createContext } from "react"

/**
 * Retorna un nuevo array donde todos los elementos están en un solo nivel.
 *
 * @param {array} array - El array a editar.
 * @returns {array} - Un nuevo array con los objetos en un solo nivel.
 */

function flatList(array) {
  return array.flatMap(objects => {
    return objects.map(object => ({ ...object }));
  });
}

/**
 * Retorna un array divido en partes segun el limite indicado
 *
 * @param {array} array - El array a editar.
 * * @param {number} limit - El limite de objetos que va a tener cada array
 * @returns {array} - Un nuevo array con arrays de un tamaño especifico
 */

function paginate(array, limit) {
  var paginated = [];
  
  for (var i = 0; i < array.length; i += limit) {
    let objects = array.slice(i, i + limit)
    paginated.push(objects);
  }
  
  return paginated;
}

/**
 * Calcula la pagina anterior y siguiente de una pagina especifica y valida si se llego al maximo de paginas
 * 
 * @param {number} queryPage - La pagina actual de la cual se va a calcular el rango
 * @param {number} limit - Limite de la ultima pagina
 * @returns {array} - Un nuevo array con la pagina anterior, actual y siguiente
 */

function getPageRange(queryPage, limit) {
  let currentPage = queryPage? queryPage === 0 || queryPage < 1 ? 1 : queryPage : 1
  const pages = [];
  currentPage = +queryPage > limit? limit : currentPage

  if (currentPage > 1) {
    pages.push(currentPage - 1);
  }
  pages.push(currentPage);
  if (currentPage < limit) {
    pages.push(currentPage + 1);
  }

  return pages;
}

/**
 * Valida si la pagina que se solicita se excede o no del limite establecido
 * 
 * @param {number} limit - Limite de las paginas
 * @param {number} currentPage - Pagina solicitada
 * @returns {number} - Numero de la pagina validada
 */

function validatePage(limit, currentPage){

  if (typeof currentPage !== 'number' || !currentPage && limit || currentPage < 0) {
    return 0
  }

  if (currentPage > limit) {
    return limit -1
  }

  if (currentPage) {
    return currentPage -1
  }

  return 0
}

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  //Estado para abrir el popup de Borrado de pokemons
  const [deletePokemonsPop, setDeletePokemonsPop] = useState(false)

  //Estado para activar el modo de Borrado de pokemons
  const [switchDelete, setSwitchDelete] = useState(false)

  //Estado para cambiar el buscador y lista de pokemons a habilidades o viceversa
  const [switchInput, setSwitchInput] = useState(false)

  //Estado para abrir el popup de Filtros
  const [filter, setFilter] = useState([])

  //Estado para guardar los pokemons seleccionados para borrar
  const [deleted, setDeleted] = useState([])

  //Estado para guardar los pokemons
  const [pokemons, setPokemons] = useState([])

  //Estado para guardar las habilidades
  const [abilities, setAbilities] = useState([])

  //Estado para mostrar la animación de carga
  const [loading, setLoading] = useState(true)

  //Estado para guardar la pagina a mostrar de pokemons
  const [pagePokemons, setPagePokemons] = useState(0)
  
  //Estado para guardar la pagina a mostrar de habilidades
  const [pageAbilities, setPageAbilities] = useState(0)

  const colors = {
    fire: "#F34A44",
    grass: "#5ed0a8",
    water: "#649fff",
    dragon: "#9576FF",
    normal: "#B3B3A1",
    bug: "#CDD91D",
    poison: "#C048AD",
    electric: "#F5F940",
    ground: "#DAC33E",
    psychic: "#F540AD",
    fighting: "#B36F69",
    fairy: "#FFB3FF",
    rock: "#CFC19E",
    ghost: "#7b5aff",
    ice: "#9AF2FF",
    steel: "#CFCDC8",
    flying: "#83B4FF",
    dark: "#9A7463",
  }

  /**
   * Retorna un array con objetos con la propiedad nombre y color segun la tabla de colores de la variable colors
   */

  const pokeTypes = Object.entries(colors).map(([key, value]) => {
    return {
      name: key,
      color: value
    };
  });


  /**
   * Elimina los Pokemons seleccionados de un array y guarda la lista en localStorage
   * 
   * @param {array} array - Array con los pokemons seleccionados para borrar de la base de datos
   * @returns {array} - Un nuevo Array con los pokemons borrados
   */

  function deletePokemons(array) {
    let pokemons = flatList(JSON.parse(localStorage.getItem('pokemons')));
    let results = pokemons.filter(pokemon => {
      return !array.includes(pokemon.name);
    });
  
    results = paginate(results, 20);
    setPokemons(results);
  
    localStorage.setItem('pokemons', JSON.stringify(results))

    return true;
  }

  /** 
   * Buscador de Pokemons
   * Busca en base a un string un pokemon especifico en una propiedad especifica y lo retorna en un array paginado
   * Busca en base a un array en base al tipo o tipos de pokemons y los retorna un array paginado
   * 
   * @param {string} input - Texto a buscar en la base de datos local de pokemons
   * @param {string} - Tipo o Propiedad a buscar en la base de datos
   * @returns {array} - Array con los pokemons encontrados
   */

  function searchPokemons(input, property) {
    let getData = flatList(JSON.parse(localStorage.getItem('pokemons')))
    let results;
  
    if (Array.isArray(input)) {
      results = getData.filter(pokemon => {
        return input.some(item => pokemon[property].includes(item));
      });
    } else {
      results = getData.filter(pokemon => pokemon[property].includes(input));
    }
  
    if (results.length < 1) {
      setPokemons([]);
      return false;
    }
  
    results = paginate(results, 20);
    setPokemons(results);
    
    return true;
  }


  /**
   * Busca una habilidad especifica dentro de la base de datos de Habilidades
   * 
   * @param {string} input - Nombre de la habilidad
   * @returns {array} - Array con las habilidades encontradas
   */

  function searchAbility(input) {
    let getData = flatList(JSON.parse(localStorage.getItem('abilities')))
    let results;

    results = getData.filter(ability => ability.name.includes(input));

    if (!results) {
      setAbilities([])
      return false
    }

    results = paginate(results, 20);
    setAbilities(results);

    return true
  }

  /**
   * Fetch de datos de Habilidades de la PokeAPI
   * Obtiene los datos de las habilidades y los guarda en un array con su nombre y descripción
   * Hace la paginación y guarda el array en un estado y localstorage para realizar su lectura localmente
   * 
   * @returns true
   */

  async function getAllAbilities() {
    try {
      if (!localStorage.getItem('abilities')) {
        console.log("Fetching PokeApi Abilities");
        const data = await fetch("https://pokeapi.co/api/v2/ability?limit=358").then(res=> res.json())
        const abilitiesData = await Promise.all(
          data.results.map(async (abilityObj) => {
            const data = await fetch(abilityObj.url).then(res=> res.json())
            
            let description = data.effect_entries.find(effectEntry => effectEntry.language.name === 'en');
            description = description? description.short_effect? description.short_effect : description.effect : null

            return {
              name: data.name,
              description
            };
          })
        );

        const abiliesFound = abilitiesData.filter(e => e != null);
        const save = paginate(abiliesFound, 20)

        setAbilities(save);
        localStorage.setItem('abilities', JSON.stringify(save))
      }
      else
      {
        console.log("Loading from LocalStorage Abilities");
        setAbilities(JSON.parse(localStorage.getItem('abilities')))
      }
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error(error);
      return null;
    }
    return true;
  }

  /**
   * Restaura base de datos
   * Fetch de datos de Pokemons de la PokeAPI
   * Obtiene los pokemons de la PokeAPI y realiza el guardado en un estado y localstorage con su paginación
   * 
   * @returns true
   */

  async function restorePokemons(){
    try {
      setLoading(true)
      console.log("Fetching PokeApi");
      const data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1281").then(res=> res.json())
      const pokemonData = await Promise.all(
        data.results.map(async (pokemon) => {
          const data = await fetch(pokemon.url).then(res=> res.json())
          return {
            id: data.id,
            name: data.name,
            image: data.sprites.other["official-artwork"].front_default,
            weight: (data.weight / 10) + "Kg",
            abilities: data.abilities,
            color: colors[data.types[0].type.name],
            type: data.types[0].type.name
          };
        })
      );
      const save = paginate(pokemonData, 20)

      setPokemons(save);
      localStorage.setItem('pokemons', JSON.stringify(save))

      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error(error);
      return null;      
    }
    return true
  }

  /**
   * Fetch de datos de Pokemons de la PokeAPI
   * Obtiene los pokemons de la PokeAPI y realiza el guardado en un estado y localstorage con su paginación
   * Realiza la carga desde localstorage si se encuentra guardado
   * 
   * @returns true
   */

  async function getAllPokemons() {
    try {
      if (!localStorage.getItem('pokemons')) {
        console.log("Fetching PokeApi");
        const data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1281").then(res=> res.json())
        const pokemonData = await Promise.all(
          data.results.map(async (pokemon) => {
            const data = await fetch(pokemon.url).then(res=> res.json())
            return {
              id: data.id,
              name: data.name,
              image: data.sprites.other["official-artwork"].front_default,
              weight: (data.weight / 10) + "Kg",
              abilities: data.abilities,
              color: colors[data.types[0].type.name],
              type: data.types[0].type.name
            };
          })
        );
  
        const save = paginate(pokemonData, 20)

        setPokemons(save);
        localStorage.setItem('pokemons', JSON.stringify(save))
      }
      else
      {
        console.log("Loading from LocalStorage");
        setPokemons(JSON.parse(localStorage.getItem('pokemons')))
      }

      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error(error);
      return null;
    }
    return true;
  }

  useEffect(() => {
    getAllPokemons()
    getAllAbilities()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AppContext.Provider
      value={{
        pagePokemons,
        setPagePokemons,
        pageAbilities,
        setPageAbilities,
        deletePokemonsPop,
        setDeletePokemonsPop,
        restorePokemons,
        deletePokemons,
        switchDelete,
        setSwitchDelete,
        switchInput,
        setSwitchInput,
        filter,
        deleted,
        setDeleted,
        setFilter,
        pokemons,
        validatePage,
        abilities,
        getPageRange,
        searchPokemons,
        searchAbility,
        pokeTypes,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
