import { useState, useEffect } from 'react'
import api from '../api/axios'

export default function EmpruntsPage() {
  const [emprunts, setEmprunts] = useState([])

  useEffect(() => {
    api.get('/emprunts').then((res) => setEmprunts(res.data.data))
  }, [])

  const handleRetour = async (id) => {
    await api.put(`/emprunts/${id}/retour`, { date_retour_effective: new Date().toISOString().split('T')[0] })
    setEmprunts((prev) => prev.filter((e) => e.id !== id))
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Emprunts en cours</h2>
      <table className="table">
        <thead>
          <tr><th>Adhérent</th><th>Exemplaire</th><th>Retour prévu</th><th></th></tr>
        </thead>
        <tbody>
          {emprunts.map((e) => (
            <tr key={e.id}>
              <td>{e.adherent?.nom}</td>
              <td>#{e.exemplaire_id}</td>
              <td>{e.date_retour_prevue}</td>
              <td><button className="btn btn-sm btn-outline-primary" onClick={() => handleRetour(e.id)}>Retour</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}