import './Navbar.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export default function Navbar(){
  const { toggleTheme } = useContext(ThemeContext)
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <div className="brand"><Link to="/">SoilSense</Link></div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/tasks">Tasks</Link>
          <Link to="/posts">Posts</Link>
        </nav>
        <div className="nav-actions">
          <button className="btn small" onClick={toggleTheme}>Toggle Theme</button>
        </div>
      </div>
    </header>
  )
}
