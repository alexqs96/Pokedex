import { Moon, Sun } from "./Icons"

/**
 * Componente de Modo Oscuro
 * Permite cambiar el tema de la pagina por clase, asignando dark o light en el etiqueta HTML
 *
 * @returns {JSX.Element} Componente con botones para cambiar el tema
 */

function Darkmode() {

  /**
   * Cambia el tema de la pagina y valida si se encuentra cargado en el dispositivo
   *
   * @param {string} theme - Tema a Agregar en LocalStorage y HTML
   */
  function swapTheme(theme) {
    const currentTheme = localStorage.getItem('theme') || 'light'

    document.documentElement.classList.remove(currentTheme)
    document.documentElement.classList.add(theme)
  
    localStorage.setItem('theme', theme)
  }

  return (
    <div className="flex">
      <button onClick={() => swapTheme("dark")}><Moon size={24} /></button>
      <button onClick={() => swapTheme("light")}><Sun size={24} /></button>
    </div>
  );
}

export default Darkmode;
