import { useState } from "react";
import { Link } from "react-router-dom"
import { useAuth } from "../context/authContext";


export default function Navbar(){
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
  
    return(
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/" className="bg-gradient-to-r from-teal-400 via-teal-500 to-sky-500 bg-clip-text text-transparent">Tik!t</Link>
            </div>
            <button
                className="navbar-hamburger"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
            >
                <span className={`hamburger-line ${menuOpen ? "open" : ""}`}></span>
                <span className={`hamburger-line ${menuOpen ? "open" : ""}`}></span>
                <span className={`hamburger-line ${menuOpen ? "open" : ""}`}></span>
            </button>
            <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
                {!user ? (
                    <div className="navbar-links-group">
                        <Link to="/auth" onClick={() => setMenuOpen(false)}>SignUp</Link>
                        <Link to="/todo" onClick={() => setMenuOpen(false)}>Create</Link>
                    </div>
                ):(
                    <div className="navbar-links-group">
                        <p className="navbar-welcome">welcome {user.name}</p>
                        <Link to="/todo" onClick={() => setMenuOpen(false)}>Create</Link>
                        <button onClick={() => { logout(); setMenuOpen(false); }}>Logout</button>
                    </div>
                )}
            </div>
        </nav>
    )
}