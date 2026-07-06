import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../hooks/useAuth'

const API_BASE = import.meta.env.VITE_API_BASE?.replace('/api', '') || 'http://localhost:8000'
const coverSrc = (url) => url ? `${API_BASE}${url}` : 'https://placehold.co/90x130?text=Livre'

export default function CataloguePage() {
  const { user } = useAuth()
  const [livres, setLivres] = useState([])
  const [categories, setCategories] = useState([])
  const [titre, setTitre] = useState('')
  const [categorie, setCategorie] = useState('')
  const [page, setPage] = useState(1)
  const [meta, setMeta] = useState({ last_page: 1, current_page: 1 })

  useEffect(() => {
    api.get('/categories').then((res) => setCategories(res.data))
  }, [])

  useEffect(() => { setPage(1) }, [titre, categorie])

  useEffect(() => {
    api.get('/livres', { params: { titre, categorie, page } })
      .then((res) => {
        setLivres(res.data.data)
        setMeta({ last_page: res.data.last_page, current_page: res.data.current_page })
      })
      .catch(() => setLivres([]))
  }, [titre, categorie, page])

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Catalogue</h2>
        {user?.role === 'bibliothecaire' && (
          <Link to="/livres/nouveau" className="btn" style={{ backgroundColor: '#009688', color: 'white' }}>
            + Ajouter un livre
          </Link>
        )}
      </div>

      <input
        className="form-control mb-3"
        placeholder="Rechercher un titre..."
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
      />

      <select className="form-select mb-3" value={categorie} onChange={(e) => setCategorie(e.target.value)}>
        <option value="">Toutes les catégories</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>{c.libelle}</option>
        ))}
      </select>

      <div className="row g-3">
        {livres.map((livre) => (
          <div className="col-md-6" key={livre.id}>
            <Link to={`/catalogue/${livre.id}`} className="text-decoration-none text-dark">
              <div className="d-flex border rounded p-2 h-100 livre-card">
                <img
                  src={coverSrc(livre.couverture_url)}
                  alt={livre.titre}
                  style={{ width: 90, height: 130, objectFit: 'cover', borderRadius: 4 }}
                />
                <div className="ms-3 flex-grow-1">
                  <h6 className="fw-bold mb-1">{livre.titre}</h6>
                  <small className="text-muted">{livre.auteurs?.map(a => a.nom).join(', ')}</small>
                  <div className="mt-2">
                    <span className="badge me-1" style={{ backgroundColor: '#EBF5F8', color: '#006699' }}>
                      {livre.categorie?.libelle}
                    </span>
                    <span className={`badge ${livre.exemplaires?.some(e => e.disponible) ? 'bg-success' : 'bg-secondary'}`}>
                      {livre.exemplaires?.some(e => e.disponible) ? 'Disponible' : 'Indisponible'}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${meta.current_page === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setPage(p => p - 1)}>‹</button>
          </li>
          {Array.from({ length: meta.last_page }, (_, i) => i + 1).map((n) => (
            <li key={n} className={`page-item ${n === meta.current_page ? 'active' : ''}`}>
              <button className="page-link" onClick={() => setPage(n)}>{n}</button>
            </li>
          ))}
          <li className={`page-item ${meta.current_page === meta.last_page ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setPage(p => p + 1)}>›</button>
          </li>
        </ul>
      </nav>
    </div>
  )
}