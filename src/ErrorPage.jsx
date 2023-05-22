import { Link } from 'react-router-dom'
import { Button } from './components/Styles'

const ErrorPage = () => {
  return (
    <main className="notfound">
      <h2>Oops</h2>
      <h3>Esta pagina no existe</h3>
      <Button $black>
        <Link to="/" >Volver al Inicio</Link>
      </Button>
    </main>
  )
}

export default ErrorPage
