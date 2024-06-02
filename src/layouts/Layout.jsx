import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function Layout() {
  // const { user, setUser } = useContext(AuthContext);


  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default Layout;
