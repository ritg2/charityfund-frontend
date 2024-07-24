import { useContext, useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBurger, faXmark } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  // Handler to close the dropdown if clicked outside
  const handleClickOutside = (event) => {
    if (event.target.closest('.dropdown') === null && !event.target.closest('#a')) {
      setOpen(false);
    }
  };

  // Use effect to add and clean up global event listener
  useEffect(() => {
    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header className="absolute top-0 bottom-0 left-0 right-0 w-full h-5 p-2 px-6 mx-auto">
      <nav className="flex items-center justify-between px-2 bg-white rounded-full">
        <div>
          <NavLink to="/campaigns" className="px-3 py-2 rounded-xl hover:bg-gray-200">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </NavLink>
        </div>

        <NavLink to="/" className="px-2 py-2 text-xl font-bold text-cyan">
          charityfund
        </NavLink>

        <div className="flex items-center justify-between gap-2">
          <div className="relative">
            <div>
              {!open ? (
                <FontAwesomeIcon
                  onClick={toggleDropdown}
                  icon={faBurger}
                  id="a"
                  className="z-10 px-3 py-2 cursor-pointer rounded-xl hover:bg-gray-200 lg:hidden dropdown"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faXmark}
                  className="z-10 px-3 py-2 cursor-pointer rounded-xl hover:bg-gray-200 lg:hidden dropdown"
                  onClick={() => setOpen(false)}
                />
              )}
            </div>
            {open && (
              <div className="absolute z-30 flex flex-col p-2 bg-white rounded-lg right-2 lg:hidden w-fit">
                {!user && (
                  <NavLink to="/signup" className="px-3 py-2 rounded- hover:bg-gray-200">
                    Sign up
                  </NavLink>
                )}
                {!user && (
                  <NavLink to="/login" className="px-3 py-2 rounded-xl hover:bg-gray-200">
                    Login
                  </NavLink>
                )}
                {user && (
                  <NavLink to="/createcampaign" className="px-3 py-2 rounded-xl hover:bg-gray-200">
                    Create
                  </NavLink>
                )}
                {user && (
                  <NavLink to="/profile" className="px-3 py-2 rounded-xl hover:bg-gray-200">
                    Profile
                  </NavLink>
                )}
                {user && (
                  <Link
                    to="/"
                    className="px-3 py-2 rounded-xl hover:bg-gray-200"
                    onClick={() => {
                      logout()
                        .then(() => navigate("/login"))
                        .catch(console.error);
                    }}
                  >
                    Logout
                  </Link>
                )}
              </div>
            )}
          </div>
          {!user ? (
            <>
              <NavLink to="/signup" className="hidden px-3 py-2 rounded-xl hover:bg-gray-200 lg:block">
                Sign up
              </NavLink>
              <NavLink to="/login" className="hidden px-3 py-2 rounded-xl hover:bg-gray-200 lg:block">
                Login
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/createcampaign" className="hidden px-3 py-2 rounded-xl hover:bg-gray-200 lg:block">
                Create Campaign
              </NavLink>
              <NavLink to="/profile" className="hidden px-3 py-2 rounded-xl hover:bg-gray-200 lg:block">
                Profile
              </NavLink>
              <Link
                to="/"
                className="hidden px-3 py-2 rounded-xl hover:bg-gray-200 lg:block"
                onClick={() => {
                  logout()
                    .then(() => navigate("/login"))
                    .catch(console.error);
                }}
              >
                Logout
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
