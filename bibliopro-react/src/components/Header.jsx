import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import logo from '../assets/logo_bibliopro.jpg'

export default function Header() {
  const { user, logout } = useAuth()
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#006699' }}>
      <div className="container-fluid px-4">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="BiblioPro" style={{ height: 70 }} />
        </Link>
        <div className="navbar-nav ms-auto d-flex flex-row gap-3">
          <Link className="nav-link text-white" to="/catalogue">Catalogue</Link>
          {user?.role === 'bibliothecaire' && (
            <>
              <Link className="nav-link text-white" to="/adherents">Adhérents</Link>
              <Link className="nav-link text-white" to="/emprunts">Emprunts</Link>
            </>
          )}
          {user && (
            <Link className="nav-link text-white" to="/profil">Profil</Link>
          )}
          {user ? (
            <button className="btn btn-sm btn-outline-light" onClick={logout}>Déconnexion</button>
          ) : (
            <Link className="nav-link text-white" to="/login">Connexion</Link>
          )}
        </div>
      </div>
    </nav>
  )
}