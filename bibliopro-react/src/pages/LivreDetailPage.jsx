import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../hooks/useAuth'

const API_BASE = import.meta.env.VITE_API_BASE?.replace('/api', '') || 'http://localhost:8000'
const coverSrc = (url) => url ? `${API_BASE}${url}` : 'https://placehold.co/200x280?text=Livre'

export default function LivreDetailPage() {
  const { id } = useParams()
  const [livre, setLivre] = useState(null)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    api.get(`/livres/${id}`).then((res) => setLivre(res.data))
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm('Supprimer ce livre ?')) return
    await api.delete(`/livres/${id}`)
    navigate('/catalogue')
  }

  if (!livre) return <div className="container mt-4">Chargement...</div>

  return (
    <div className="container mt-4">
      <img
        src={coverSrc(livre.couverture_url)}
        alt={livre.titre}
        style={{ width: 150, height: 210, objectFit: 'cover', borderRadius: 4 }}
        className="mb-3"
      />
      <h2>{livre.titre}</h2>
      <p className="text-muted">
        {livre.auteurs?.map(a => a.nom).join(', ')} — {livre.categorie?.libelle} — {livre.annee_publication}
      </p>

      <h5 className="mt-4">Exemplaires</h5>
      <ul className="list-group mb-3">
        {livre.exemplaires?.map((ex) => (
          <li key={ex.id} className="list-group-item d-flex justify-content-between">
            <span>Exemplaire #{ex.id} — {ex.etat}</span>
            <span className={ex.disponible ? 'text-success' : 'text-danger'}>
              {ex.disponible ? 'Disponible' : 'Emprunté'}
            </span>
          </li>
        ))}
      </ul>

      {user?.role === 'bibliothecaire' && (
        <div className="d-flex gap-2 mb-4">
          <button
            className="btn"
            style={{ backgroundColor: '#009688', color: 'white' }}
            onClick={() => navigate('/emprunts/nouveau', { state: { livreId: livre.id } })}
          >
            Emprunter
          </button>
          <button className="btn btn-outline-secondary" onClick={() => navigate(`/livres/${id}/modifier`)}>
            Modifier
          </button>
          <button className="btn btn-outline-danger" onClick={handleDelete}>
            Supprimer
          </button>
        </div>
      )}

      <h5 className="mt-4">Historique des derniers emprunts</h5>
      <ul className="list-group">
        {(livre.emprunts || []).map((e) => (
          <li key={e.id} className="list-group-item">
            {e.adherent?.nom} — {e.date_retour_effective ? 'retourné le ' + e.date_retour_effective : 'en cours'}
          </li>
        ))}
      </ul>
    </div>
  )
}