import { Children, useContext, useEffect } from 'react'
import { Card, InfoCard, ItemsBox, Tag } from './components/Styles'
import { AppContext } from './context/AppContext'
import Buttons from './components/Buttons'
import { useSearchParams } from 'react-router-dom'

function App() {
  const [params, setParams] = useSearchParams()
  const { abilities, pokemons, loading, pagePokemons, setPagePokemons, pageAbilities, setPageAbilities, switchInput, validatePage, searchPokemons, deleted, setDeleted, switchDelete, setSwitchDelete, setDeletePokemonsPop } = useContext(AppContext)

  function handleCloseDelete() {
    setSwitchDelete(false)
    setDeleted([])
    document.querySelectorAll(".selected").forEach(e => { e.classList.remove("selected") })
  }

  function handleDeleteList(name, e) {
    if (deleted.includes(name)) {
      setDeleted(deleted.filter((e) => e !== name))
      e.currentTarget.classList.remove("selected")
    }
    else {
      setDeleted([...deleted, name])
      e.currentTarget.classList.add("selected")
    }
  }

  useEffect(() => {

    if (params.get('search')) {
      searchPokemons(params.get('search'), "name")
    }

    if (params.get('pag')) {
      setPagePokemons(validatePage(pokemons.length, +params.get('pag')))
      setPageAbilities(validatePage(abilities.length, +params.get('pag')))
    }
  }, [])

  return (
    <main>
      {
        loading ?
          <div className='pokeballBox'>
            <div className="pokeball">
              <div className="pokeball-top"></div>
              <div className="pokeball-middle"></div>
              <div className="pokeball-bottom"></div>
            </div>
            <h2>Cargando..</h2>
          </div>
          :
          <>
            {
              switchInput ?
                <>
                  <ItemsBox $width="320px">
                    {
                      abilities[pageAbilities]?.length ?
                        Children.toArray(
                          abilities[pageAbilities].map(e => (
                            <InfoCard>
                              <h2>{e.name}</h2>
                              <p>{e.description ? e.description : "El Centro Pokemon se encuentra investigando sobre esta habilidad."}</p>
                            </InfoCard>
                          ))
                        )
                        :
                        <p>Sin Resultados</p>
                    }
                  </ItemsBox>
                  <Buttons
                    queryPage={+params.get('pag')}
                    limit={abilities.length}
                    setPage={setPageAbilities}
                    setParams={setParams}
                  />
                </>
                :
                <>
                  <ItemsBox $width="280px">
                    {
                      pokemons[pagePokemons]?.length ?
                        Children.toArray(
                          pokemons[pagePokemons].map(e => (
                            <Card $color={e.color} onClick={(x) => { switchDelete ? handleDeleteList(e.name, x) : null }} className={switchDelete ? "shake" : ""}>
                              <div className='loading'>
                                <img src={e.image ? e.image : "/img/pokemon_loading.png"} alt={"Imagen de " + e.name} loading='lazy' />
                              </div>
                              <h3>{e.name}</h3>
                              <div id='details'>
                                <Tag><h6>Habilidades</h6> <h6>{e.weight}</h6></Tag>
                                {
                                  Children.toArray(
                                    e.abilities.map(e => (
                                      <span>{e.ability.name}</span>
                                    ))
                                  )
                                }
                              </div>
                            </Card>
                          ))
                        )
                        :
                        <p>Sin Resultados</p>
                    }
                  </ItemsBox>
                  {
                    switchDelete ?
                      <div className='deleteMode'>
                        <button onClick={() => handleCloseDelete()}>Cancelar</button>

                        <button onClick={() => setDeletePokemonsPop(true)}>
                          Borrar {deleted.length} Pokemons
                        </button>
                      </div>
                      :
                      null
                  }
                  <Buttons
                    queryPage={+params.get('pag')}
                    limit={pokemons.length}
                    setPage={setPagePokemons}
                    setParams={setParams}
                  />
                </>
            }
          </>
      }
    </main>
  )
}

export default App
