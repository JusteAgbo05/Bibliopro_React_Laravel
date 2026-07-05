import { useState, useEffect } from 'react'
import api from '../api/axios'

export default function ProfilPage() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.get('/me')
      .then((res) => setData(res.data))
      .catch((err) => setError(err.response?.data?.message || err.message))
  }, [])

  if (error) return <div className="container mt-4 alert alert-danger">Erreur : {error}</div>
  if (!data) return <div className="container mt-4">Chargement...</div>

  return (
    <div className="container mt-4">
      <h2>Mon profil</h2>
      <p><strong>Nom :</strong> {data.user.name}</p>
      <p><strong>Email :</strong> {data.user.email}</p>
      <p><strong>Rôle :</strong> {data.user.role}</p>
      {data.adherent && (
        <>
          <h5 className="mt-4">Historique des emprunts</h5>
          <ul className="list-group">
            {(data.adherent.emprunts || []).map((e) => (
              <li key={e.id} className="list-group-item">
                {e.exemplaire?.livre?.titre} — retour {e.date_retour_effective ? 'le ' + e.date_retour_effective : 'prévu ' + e.date_retour_prevue}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}