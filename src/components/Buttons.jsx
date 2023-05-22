import { useContext, Children } from "react"
import { AppContext } from "../context/AppContext"

/**
 * Componente de botones de paginación.
 * Renderiza tres botones y permite cambiar la página.
 *
 * @param {number} queryPage - Página actual.
 * @param {number} limit - Cantidad de Botones
 * @param {function} setPage - Función para actualizar el estado de la página.
 * @param {function} setParams - Función para actualizar la query Pag con la pagina actual.
 * @returns {JSX.Element} Componente de botones de paginación.
 */

const Buttons = ({ queryPage, limit, setPage, setParams}) => {
  const {getPageRange, validatePage} = useContext(AppContext)

  /**
   * Cambia la página actual y actualiza la query Pag de la url.
   * Valida el limite en caso de que se ingrese manualmente una pagina inexistente o que no sea numero
   * 
   * @param {number} btn - Página a la que se va a cambiar.
   */
  function changePage(btn){
    setParams({pag: btn})
    setPage(validatePage(limit, btn))
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }

  return (
    <div className="pages">
      {
        Children.toArray(
        getPageRange(queryPage, limit).map((btn,index) => (
          <button
            onClick={() => changePage(btn)}
            data-active={queryPage === 0 && index === 0? "true" : queryPage === btn? "true" : "false"}
          >
            {btn}
          </button>
        ))
        )
      }
    </div>
  )
}

export default Buttons
