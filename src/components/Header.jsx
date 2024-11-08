import { Link } from "react-router-dom";
import '../styles/Header.css';

const Header = () => {
    return (
        <div className="header">
            <h1 className="header-text">NC News</h1>
            <Link to="/home" className="home-button">Home</Link>
        </div>
    );
}

export default Header;
