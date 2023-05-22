import { Children, useEffect, useState, useContext, useRef } from 'react'
import { Outlet, Link, useSearchParams } from "react-router-dom"
import { AbilityIcon, DownloadIcon, FilterIcon, GithubLogo, PokemonLogo, SearchIcon } from "./icons"
import { FilterOption } from "./Styles"
import Darkmode from './darkmode'
import { AppContext } from '../context/appContext'

const PageHeader = () => {
  //Estado para activar el popup de restauración de base de datos de pokemons
  const [restore, setRestore] = useState(false)

  //Estado para cambiar la query de la url
  // eslint-disable-next-line no-unused-vars
  const [params, setParams] = useSearchParams()
  const { searchPokemons, searchAbility, pokeTypes, filter, setFilter, switchInput, setSwitchInput, switchDelete, setSwitchDelete, setDeleted, restorePokemons, deleted, deletePokemons, deletePokemonsPop, setDeletePokemonsPop } = useContext(AppContext)

  //Ref del input del Buscador
  const inputSearch = useRef(null)

  //Estados para activar el popup de filtros
  const [openFilter, setOpenFilter] = useState(false)

  /**
   * Borra los pokemons seleccionados de la base de datos
   * Desactiva los estados abiertos como popup
   * Vacia los estados donde se guardo los pokemons elegidos
   * Realiza el borrado de los pokemons
   */

  function handleDeletePokemons() {
    setSwitchDelete(false)
    setDeleted([])
    deletePokemons(deleted)
    setDeletePokemonsPop(false)
    document.querySelectorAll(".selected").forEach(e => { e.classList.remove("selected") })
  }

  /**
   * Crea un array con los filtros seleccionados
   * 
   * @param {string} option - Propiedad a agregar a la lista de filtrado
   * @param {*} e - Elemento donde se aplicara o quitara la clase active 
   */
  function handleFilters(option, e) {
    if (filter.includes(option)) {
      setFilter(filter.filter((e) => e !== option))
      e.currentTarget.classList.remove("active")
    } else {
      setFilter([...filter, option])
      e.currentTarget.classList.add("active")
    }
  }

  /**
   * Limpia los filtros y devuelve el listado completo de pokemons
   * Desactiva el popup de filtros
   */

  function cleanFilters() {
    setFilter([])
    searchPokemons("", "name")
    document.querySelectorAll(".menu button").forEach(e => { e.classList.remove("active") })
    setOpenFilter(false)
  }

  /**
   * Activa el modo de Borrado de pokemons, en caso de apretarse devuelta, borra el listado de pokemons seleccionados previamente sin afectar la base de datos
   */

  function openDelete() {
    setSwitchDelete(!switchDelete)

    if (switchDelete) {
      setDeleted([])
      document.querySelectorAll(".selected").forEach(e => { e.classList.remove("selected") })
    }
  }

  /**
   * realiza una busqueda en la base de datos de pokemons si el estado de filtro cambia
   */

  useEffect(() => {
    if (filter.length > 0) {
      searchPokemons(filter, "type")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  return (
    <header>
      <Link to="/" className='logo'>
        <PokemonLogo size={170} />
      </Link>

      <nav className='searchbar'>
        <button onClick={() => { setSwitchInput(!switchInput), setOpenFilter(false) }} className={'switchInput ' + (switchInput ? 'switchActive' : "")}><AbilityIcon size={20} /></button>
        <div>
          <button
            onClick={() => { switchInput ? searchAbility(inputSearch.current.value) : searchPokemons(inputSearch.current.value, "name") }}
          >
            <SearchIcon size={20} />
          </button>

          <input
            onKeyDown={e => e.key === "Enter" ? inputSearch.current.value ? [switchInput ? searchAbility(inputSearch.current.value) : searchPokemons(inputSearch.current.value, "name"), setParams({ search: inputSearch.current.value })] : location.replace('/') : null}
            ref={inputSearch}
            type="text"
            placeholder={switchInput ? "Buscar Habilidad" : "Buscar Pokemon"}
          />
        </div>

        {
          !switchInput ?
            <>
              <button onClick={() => setOpenFilter(!openFilter)} className='filter'><FilterIcon size={20} /></button>
              <button onClick={() => openDelete()} className={'delete ' + (switchDelete ? "deletedOn" : "")}>X</button>
              <button onClick={() => setRestore(!restore)} className='download'><DownloadIcon size={20} /></button>
            </>
            :
            null
        }

        {
          restore ?
            <div className='popup'>
              <p>¿Queres restaurar la base de datos?</p>
              <div>
                <button onClick={() => { restorePokemons(), setRestore(false) }}>Restaurar</button>
                <button onClick={() => setRestore(false)}>Cancelar</button>
              </div>
            </div>
            :
            null
        }

        {
          deletePokemonsPop ?
            <div className='popup'>
              <p>¿Queres borrar los pokemons seleccionados?</p>
              <div>
                <button onClick={() => handleDeletePokemons()}>Borrar</button>
                <button onClick={() => setDeletePokemonsPop(false)}>Cancelar</button>
              </div>
            </div>
            :
            null
        }

      </nav>

      <div className={"menu "+(openFilter? "show" : "")}>
        <p>Filtrar por Tipo</p>
        <button onClick={() => cleanFilters()}><FilterOption $color="#000" /> Todos</button>
        {
          pokeTypes ?
            Children.toArray(
              pokeTypes.map(e => (
                <button onClick={(obj) => handleFilters(e.name, obj)}><FilterOption $color={e.color} /> {e.name}</button>
              ))
            )
            :
            null
        }
      </div>

      <Darkmode />
    </header>
  )
}

const PageFooter = () => {
  return (
    <footer>
      <a href='https://github.com/alexqs96/pokedex' target="_blank" rel="noreferrer noopener">
        <GithubLogo size={24} />
        @alexqs96
      </a>

      <p>Pokedex Challenge</p>
    </footer>
  )
}

/**
 * Carga el Tema actual elegido, si no encuentra ninguno carga el tema "light" por defecto
 * Detiene la carga de la pagina si se encuentra cargando el tema
 * 
 * @returns {JSX.Element} Componente con el Layout de la pagina
 */

const Layout = () => {

  const [loadingDarkMode, setLoadingDarkMode] = useState(true)
  useEffect(() => {
    if (!localStorage.theme) {
      localStorage.theme = "light"
      document.documentElement.classList.add("light")
    } else {
      document.documentElement.classList.add(localStorage.theme)
    }
    setLoadingDarkMode(false)
  }, [])
  if (loadingDarkMode) {
    return null
  }

  return (
    <>
      <PageHeader />
      <Outlet />
      <PageFooter />
    </>
  )
}

export default Layout
