import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function LivreFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ titre: '', isbn: '', annee_publication: '', categorie_id: '' })
  const [categories, setCategories] = useState([])
  const [fichier, setFichier] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/categories').then((res) => setCategories(res.data))
    if (id) {
      api.get(`/livres/${id}`).then((res) => setForm({
        titre: res.data.titre,
        isbn: res.data.isbn,
        annee_publication: res.data.annee_publication,
        categorie_id: res.data.categorie_id,
      }))
    }
  }, [id])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    Object.entries(form).forEach(([k, v]) => formData.append(k, v))
    if (fichier) formData.append('couverture', fichier)
    if (id) formData.append('_method', 'PUT')

    try {
      await api.post(id ? `/livres/${id}` : '/livres', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      navigate('/catalogue')
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'enregistrement.')
    }
  }

  return (
    <div className="container mt-4" style={{ maxWidth: 500 }}>
      <h2 className="mb-4">{id ? 'Modifier le livre' : 'Nouveau livre'}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Titre</label>
          <input name="titre" className="form-control" value={form.titre} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">ISBN</label>
          <input name="isbn" className="form-control" value={form.isbn} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Année de publication</label>
          <input type="number" name="annee_publication" className="form-control" value={form.annee_publication} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Catégorie</label>
          <select name="categorie_id" className="form-select" value={form.categorie_id} onChange={handleChange} required>
            <option value="">Choisir...</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.libelle}</option>)}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Couverture</label>
          <input type="file" accept="image/*" className="form-control" onChange={(e) => setFichier(e.target.files[0])} />
        </div>
        <button type="submit" className="btn w-100" style={{ backgroundColor: '#009688', color: 'white' }}>
          Enregistrer
        </button>
      </form>
    </div>
  )
}