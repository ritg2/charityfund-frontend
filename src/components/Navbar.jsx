import { useContext, useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, setUser } = useContext(AuthContext);

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  return (
    <>
      <header>
        <nav>
          <h1>
            <NavLink to="/">Charityfund</NavLink>
          </h1>
          <ul className="nav-items">
            <li>
              <NavLink to="/campaigns">Browse Campaigns</NavLink>
            </li>
            {!user ? (
              <>
                <li>
                  <NavLink to="/signup">Sign up</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/createcampaign">Create Campaign</NavLink>
                </li>
                <li>
                  <NavLink to="/profile">Profile</NavLink>
                </li>
                <li>
                  <Link to="/" onClick={logout}>
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
