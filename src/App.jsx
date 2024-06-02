import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";

import { useContext, useEffect } from "react";
import "./App.css";
import Layout from "./layouts/Layout.jsx";
import Home from "./pages/Home.jsx";
import { AuthContext } from "./context/AuthContext.jsx";
import axios from "axios";

function App() {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const { accessToken } = JSON.parse(localStorage.getItem("auth")) || "";
    if (!accessToken) {
      return;
    }
    axios
      .get("http://localhost:5001/api/user/current", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => setUser(response.data))
      .catch((error) => console.log(error));
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {!user && <Route path="signup" element={<SignUp />} />}
        {!user && <Route path="login" element={<Login />} />}
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
