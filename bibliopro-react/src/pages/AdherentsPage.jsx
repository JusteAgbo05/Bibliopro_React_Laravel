import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'

export default function AdherentsPage() {
  const [adherents, setAdherents] = useState([])
  const [page, setPage] = useState(1)
  const [meta, setMeta] = useState({ last_page: 1, current_page: 1 })

  useEffect(() => {
    api.get('/adherents', { params: { page } }).then((res) => {
      setAdherents(res.data.data)
      setMeta({ last_page: res.data.last_page, current_page: res.data.current_page })
    })
  }, [page])

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Adhérents</h2>
        <Link to="/adherents/nouveau" className="btn" style={{ backgroundColor: '#009688', color: 'white' }}>
          + Inscrire
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr><th>Nom</th><th>Email</th><th>Inscrit le</th><th></th></tr>
        </thead>
        <tbody>
          {adherents.map((a) => (
            <tr key={a.id}>
              <td>{a.nom} {a.prenom}</td>
              <td>{a.email}</td>
              <td>{a.date_inscription}</td>
              <td><Link to={`/adherents/${a.id}`} className="btn btn-sm btn-outline-primary">Voir fiche</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
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