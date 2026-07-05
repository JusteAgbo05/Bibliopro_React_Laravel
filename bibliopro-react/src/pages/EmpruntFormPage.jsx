import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function EmpruntFormPage() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [exemplaires, setExemplaires] = useState([])
  const [adherents, setAdherents] = useState([])
  const [exemplaireId, setExemplaireId] = useState('')
  const [adherentId, setAdherentId] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (state?.livreId) {
      api.get(`/livres/${state.livreId}`).then((res) =>
        setExemplaires(res.data.exemplaires.filter((e) => e.disponible))
      )
    }
    api.get('/adherents').then((res) => setAdherents(res.data.data))
  }, [state])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/emprunts', { exemplaire_id: exemplaireId, adherent_id: adherentId })
      navigate('/emprunts')
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création de l\'emprunt.')
    }
  }

  return (
    <div className="container mt-4" style={{ maxWidth: 500 }}>
      <h2 className="mb-4">Nouvel emprunt</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Exemplaire disponible</label>
          <select className="form-select" value={exemplaireId} onChange={(e) => setExemplaireId(e.target.value)} required>
            <option value="">Choisir...</option>
            {exemplaires.map((ex) => (
              <option key={ex.id} value={ex.id}>Exemplaire #{ex.id} — {ex.etat}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Adhérent</label>
          <select className="form-select" value={adherentId} onChange={(e) => setAdherentId(e.target.value)} required>
            <option value="">Choisir...</option>
            {adherents.map((a) => (
              <option key={a.id} value={a.id}>{a.nom} {a.prenom}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn w-100" style={{ backgroundColor: '#009688', color: 'white' }}>
          Valider
        </button>
      </form>
    </div>
  )
}