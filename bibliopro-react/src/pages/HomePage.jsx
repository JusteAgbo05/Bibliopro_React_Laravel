import { Link } from 'react-router-dom'

import bg from '../assets/arriere_plan.jpg'

export default function HomePage() {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center text-center flex-grow-1"
        style={{
       backgroundImage: `url(${bg})`,
       backgroundSize: 'cover',
       backgroundPosition: 'center',
       minHeight: '100vh',}}
    >
      <Link to="/catalogue" className="btn btn-lg mt-3" style={{ backgroundColor: '#009688', color: 'white' }}>
        Consulter le catalogue
      </Link>
    </div>
  )
}