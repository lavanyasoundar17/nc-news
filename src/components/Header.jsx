import { Link } from "react-router-dom";
import '../styles/Header.css';

const Header = () => {
  return (
    <section className="header">
      <Link to="/home" className="home-button">Home</Link>
      <h1 className="header-text">NC News</h1>
    </section>
  );
};

export default Header;
