import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios'

export default function AdherentDetailPage() {
  const { id } = useParams()
  const [adherent, setAdherent] = useState(null)

  useEffect(() => {
    api.get(`/adherents/${id}`).then((res) => setAdherent(res.data))
  }, [id])

  if (!adherent) return <div className="container mt-4">Chargement...</div>

  return (
    <div className="container mt-4">
      <h2>{adherent.nom} {adherent.prenom}</h2>
      <p>{adherent.email} — inscrit le {adherent.date_inscription}</p>

      <h5 className="mt-4">Historique des emprunts</h5>
      <ul className="list-group">
        {(adherent.emprunts || []).map((e) => (
          <li key={e.id} className="list-group-item">
            {e.exemplaire?.livre?.titre} — {e.date_retour_effective ? 'retourné le ' + e.date_retour_effective : 'à rendre le ' + e.date_retour_prevue}
          </li>
        ))}
      </ul>
    </div>
  )
}