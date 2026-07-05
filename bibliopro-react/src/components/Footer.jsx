export default function Footer() {
  return (
    <footer className="text-white py-3 mt-auto" style={{ backgroundColor: '#006699' }}>
      <div className="container d-flex justify-content-between align-items-center flex-wrap">
        <small>&copy; {new Date().getFullYear()} BiblioPro — Tous droits réservés</small>
        <small>Projet OIF DCLIC — Développement Web Niveau Approfondi</small>
        <small>Contact : vivienagbo56@gmail.com</small>
      </div>
    </footer>
  )
}