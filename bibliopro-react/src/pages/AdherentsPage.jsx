import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'

export default function AdherentsPage() {
  const [adherents, setAdherents] = useState([])

  useEffect(() => {
    api.get('/adherents').then((res) => setAdherents(res.data.data))
  }, [])

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
              <td>
                <Link to={`/adherents/${a.id}`} className="btn btn-sm btn-outline-primary">Voir fiche</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}