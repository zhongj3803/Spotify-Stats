import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1><Link to="/">Spotify Stats</Link></h1>
            <div className="links">
                <Link to="/recents">Recently played</Link>
                <Link to="/toptracks">Top tracks</Link>
                <Link to="/topartists">Top artists</Link>
                <Link to="/info">Your information</Link>
            </div>
        </nav>
    );
}

export default Navbar;