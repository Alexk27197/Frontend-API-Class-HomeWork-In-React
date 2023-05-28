import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <ul className="ul">
          <li>
            <Link to="/">HomePage</Link>
          </li>
          <li>
            <Link to="/search-about-me">Search-About-Me</Link>
          </li>
          <li>
            <Link to="/albums-images">Albums/Images</Link>
          </li>
          <li>
            <Link to="/news">News</Link>
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
          <li>
            <Link to="/garage">Grage-Search</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
