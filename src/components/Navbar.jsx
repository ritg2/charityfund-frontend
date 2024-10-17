import { useContext, useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faHouse,
  faAddressCard,
  faAddressBook,
  faRightToBracket,
  faUserPlus,
  faCirclePlus,
  faUser,
  faTableColumns,
  faSun,
  faMoon,
  faBurger,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function Navbar({ toggleTheme, theme }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target || typeof e.target.className !== "string") return;
      if (!e.target.className.includes("dropdown")) setOpen(false);
    };

    if (open) {
      window.addEventListener("click", closeDropdown);
    }

    return () => {
      window.removeEventListener("click", closeDropdown);
    };
  }, [open]);

  return (
    <header>
      <div className="flex items-center justify-center w-full px-2 bg-white shadow-sm dark:bg-dark-cyan-dark">
        <nav className="container relative flex items-center justify-between w-full">
          {/* Logo */}
          <NavLink to="/" className="px-2 py-2 text-xl font-bold text-cyan">
            charityfund
          </NavLink>

          {/* Nav Items */}
          <div
            className={`items-center justify-between dark:bg-dark-cyan-dark gap-2 lg:flex bg-white  lg:relative  ${
              !open
                ? "hidden"
                : "flex flex-col p-2 absolute right-0 top-[40px] rounded-lg shadow-sm z-50"
            }`}
          >
            <NavLink
              to="/"
              className="flex flex-row items-center justify-start w-full gap-1 px-1 py-2 lg:w-fit rounded-xl hover:text-cyan dark:text-white dark:hover:text-cyan"
            >
              <FontAwesomeIcon icon={faHouse} />
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/"
              className="flex flex-row items-center justify-start w-full gap-1 px-1 py-2 rounded-xl hover:text-cyan dark:hover:text-cyan dark:text-white lg:w-fit"
            >
              <FontAwesomeIcon icon={faAddressCard} />
              <span>About Us</span>
            </NavLink>

            <NavLink
              to="/search"
              className="flex flex-row items-center justify-start w-full gap-1 px-1 py-2 rounded-xl hover:text-cyan dark:hover:text-cyan dark:text-white lg:w-fit"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <span>Search</span>
            </NavLink>

            <NavLink
              to="/"
              className="flex flex-row items-center justify-start w-full gap-1 px-1 py-2 rounded-xl hover:text-cyan dark:hover:text-cyan dark:text-white lg:w-fit"
            >
              <FontAwesomeIcon icon={faAddressBook} />
              <span>Contact</span>
            </NavLink>

            {/*Nav Items if user is logged in */}
            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className="flex flex-row items-center justify-start w-full gap-1 px-1 py-2 rounded-xl hover:text-cyan dark:hover:text-cyan dark:text-white lg:w-fit"
                >
                  <FontAwesomeIcon icon={faRightToBracket} />
                  <span>Login</span>
                </NavLink>

                <NavLink
                  to="/signup"
                  className="flex flex-row items-center justify-start w-full gap-1 px-1 py-2 rounded-xl hover:text-cyan dark:hover:text-cyan dark:text-white lg:w-fit"
                >
                  <FontAwesomeIcon icon={faUserPlus} />
                  <span>Sign Up</span>
                </NavLink>
              </>
            ) : (
              <>
                {user.role === "ngo" && (
                  <NavLink
                    to="/createcampaign"
                    className="flex flex-row items-center justify-start w-full gap-1 px-1 py-2 rounded-xl hover:text-cyan dark:hover:text-cyan dark:text-white lg:w-fit"
                  >
                    <FontAwesomeIcon icon={faCirclePlus} />
                    <span>Create</span>
                  </NavLink>
                )}
                <NavLink
                  to={`/profile/${user._id}`}
                  className="flex flex-row items-center justify-start w-full gap-1 px-1 py-2 rounded-xl hover:text-cyan dark:hover:text-cyan dark:text-white lg:w-fit"
                >
                  <FontAwesomeIcon icon={faUser} />
                  <span>Profile</span>
                </NavLink>
                {user.role === "admin" && (
                  <NavLink
                    to="/dashboard"
                    className="flex flex-row items-center justify-start w-full gap-1 px-1 py-2 rounded-xl hover:text-cyan dark:hover:text-cyan dark:text-white lg:w-fit"
                  >
                    <FontAwesomeIcon icon={faTableColumns} />
                    <span>Dashboard</span>
                  </NavLink>
                )}
                <button
                  onClick={() => {
                    logout().then(() => navigate("/"));
                  }}
                  className="flex flex-row items-center justify-start w-full gap-1 px-1 py-2 rounded-xl hover:text-cyan dark:hover:text-cyan dark:text-white lg:w-fit"
                >
                  <FontAwesomeIcon icon={faRightToBracket} />
                  <span>Logout</span>
                </button>
              </>
            )}
            <button
              onClick={toggleTheme}
              className="flex flex-row items-center justify-start w-full gap-1 px-1 py-2 rounded-xl hover:text-cyan dark:hover:text-cyan dark:text-white lg:w-fit"
            >
              {theme === "light" ? (
                <>
                  <FontAwesomeIcon icon={faSun} />
                  <span>Light</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faMoon} />
                  <span>Dark</span>
                </>
              )}
            </button>
          </div>

          {/* Hamburger menu*/}

          <div
            className="h-[30px] w-[30px] rounded-full hover:text-cyan dark:hover:text-cyan dark:text-white lg:hidden flex justify-center items-center dropdown"
            onClick={toggleDropdown}
          >
            {!open ? (
              <FontAwesomeIcon icon={faBurger} />
            ) : (
              <FontAwesomeIcon icon={faXmark} />
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
