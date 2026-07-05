import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import HomePage from './pages/HomePage'
import CataloguePage from './pages/CataloguePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AdherentsPage from './pages/AdherentsPage'
import EmpruntsPage from './pages/EmpruntsPage'
import LivreDetailPage from './pages/LivreDetailPage'
import ProfilPage from './pages/ProfilPage'
import AdherentFormPage from './pages/AdherentFormPage'
import AdherentDetailPage from './pages/AdherentDetailPage'
import EmpruntFormPage from './pages/EmpruntFormPage'
import LivreFormPage from './pages/LivreFormPage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogue" element={<CataloguePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/adherents" element={<PrivateRoute role="bibliothecaire"><AdherentsPage /></PrivateRoute>} />
          <Route path="/emprunts" element={<PrivateRoute role="bibliothecaire"><EmpruntsPage /></PrivateRoute>} />
          <Route path="/catalogue/:id" element={<LivreDetailPage />} />
          <Route path="/profil" element={<ProfilPage />} />
          <Route path="/adherents/nouveau" element={<PrivateRoute role="bibliothecaire"><AdherentFormPage /></PrivateRoute>} />
        <Route path="/adherents/:id" element={<PrivateRoute role="bibliothecaire"><AdherentDetailPage /></PrivateRoute>} />
        <Route path="/emprunts/nouveau" element={<PrivateRoute role="bibliothecaire"><EmpruntFormPage /></PrivateRoute>} />
        <Route path="/livres/:id/modifier" element={<PrivateRoute role="bibliothecaire"><LivreFormPage /></PrivateRoute>} />
        <Route path="/livres/nouveau" element={<PrivateRoute role="bibliothecaire"><LivreFormPage /></PrivateRoute>} />
        </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App