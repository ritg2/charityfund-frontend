import { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, setUser } = useContext(AuthContext);

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  console.log(user)

  return (
    <>
      <header>
        <nav>
          <h1>
            <NavLink to="/">Charityfund</NavLink>
          </h1>
          <ul className="nav-items">
            {!user? (
              <>
                <li>
                  <NavLink to="/signup">Sign up</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              </>
            ) : (
              <li>
                <NavLink to="/" onClick={logout}>
                  Logout
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
