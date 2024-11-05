import { Link } from "react-router-dom"
import '../styles/Header.css'


const Header =()=>{
    return(
        <div>
        <div className="header-text">
            <h1>Northcoders News</h1>
            </div>
            <nav className="nav-links">
                <Link to = "/home">Home</Link>
                <Link to = "/users">Users</Link>
                <Link to = "/topics">Topics</Link>

            </nav>
            
            </div>

    )
}

export default Header;