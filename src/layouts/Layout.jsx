import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

function Layout() {
  const [theme, setTheme] = useState(() => {
    let storedTheme = localStorage.getItem("theme");
    if (!storedTheme) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        storedTheme = "dark";
      } else {
        storedTheme = "light";
      }
      localStorage.setItem("theme", storedTheme);
    }
    return storedTheme;
  });

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    if (theme === "dark") {
      window.document.body.classList.add("dark");
      window.document.body.classList.add("darkMode");
    } else {
      window.document.body.classList.remove("dark");
      window.document.body.classList.remove("darkMode");
    }
  }, [theme]);

  return (
    <>
      <Navbar toggleTheme={toggleTheme} theme={theme} />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default Layout;
