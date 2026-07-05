import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function AdherentFormPage() {
  const [form, setForm] = useState({ nom: '', prenom: '', email: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/adherents', form)
      navigate('/adherents')
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'inscription.')
    }
  }

  return (
    <div className="container mt-4" style={{ maxWidth: 400 }}>
      <h2 className="mb-4">Inscrire un adhérent</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nom</label>
          <input name="nom" className="form-control" value={form.nom} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Prénom</label>
          <input name="prenom" className="form-control" value={form.prenom} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn w-100" style={{ backgroundColor: '#009688', color: 'white' }}>Inscrire</button>
      </form>
    </div>
  )
}