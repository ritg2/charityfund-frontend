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
import CreateCampaign from "./pages/CreateCampaign.jsx";
import Campaigns from "./pages/Campaigns.jsx";
import Profile from "./pages/Profile.jsx";
import NotFound from "./pages/NotFound.jsx";
import CampaignDetails, {
  campaignDetailsLoader,
} from "./pages/CampaignDetails.jsx";
import Comments, { commentsLoader } from "./pages/Comments.jsx";

function App() {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const { accessToken } = JSON.parse(localStorage.getItem("auth")) || "";
    if (!accessToken) {
      return;
    }
    axios
      .get("http://localhost:5001/api/v1/user/current", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => setUser(response.data))
      .catch((error) => {
        console.log(error);
        localStorage.clear();
      });
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {!user && <Route path="signup" element={<SignUp />} />}
        {!user && <Route path="login" element={<Login />} />}
        {user && <Route path="createcampaign" element={<CreateCampaign />} />}
        {user && <Route path="profile" element={<Profile />} />}
        <Route path="campaigns" element={<Campaigns />} />
        <Route
          path="campaigndetails/:id"
          element={<CampaignDetails />}
          loader={campaignDetailsLoader}
        >
          <Route
            path="comments"
            element={<Comments />}
            loader={commentsLoader}
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
