import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'

export default function NavBar() {
  const { user, logout } = useUser()

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-600">
        <Link to="/">Motari.Dev</Link>
      </div>
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
        <Link to="user/posts/" className="text-gray-700 hover:text-blue-600">Blog</Link>
        <Link to="/user/projects" className="text-gray-700 hover:text-blue-600">Projects</Link>

        {!user ? (
          <>
            <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
          </>
        ) : (
          <>
            <Link to="/user" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
            <button onClick={logout} className="text-red-600 hover:underline">Logout</button>
          </>
        )}
      </div>
    </nav>
  )
}
