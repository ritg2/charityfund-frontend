import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";

import "./App.css";
import Layout from "./layouts/Layout.jsx";
import Home from "./pages/Home.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import CreateCampaign from "./pages/CreateCampaign.jsx";
import Search from "./pages/Search.jsx";
import Profile, { profileLoader } from "./pages/Profile.jsx";
import NotFound from "./pages/NotFound.jsx";
import CampaignDetails, {
  campaignDetailsLoader,
} from "./pages/CampaignDetails.jsx";
import Comments, { commentsAction, commentsLoader } from "./pages/Comments.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import CreateNgo from "./pages/CreateNgo.jsx";
import Dashboard, { dashboardLoader } from "./pages/Dashboard.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} errorElement={<ErrorPage />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<Login />} />
      <Route path="createngo" element={<CreateNgo />} />
      <Route path="createcampaign" element={<CreateCampaign />} />
      <Route
        path="dashboard"
        element={<Dashboard />}
        loader={dashboardLoader}
      />
      <Route
        path="profile/:profileId"
        element={<Profile />}
        loader={profileLoader}
      />
      <Route path="search" element={<Search />} />
      <Route
        path="campaigndetails/:id"
        element={<CampaignDetails />}
        loader={campaignDetailsLoader}
        errorElement={<ErrorPage />}
      >
        <Route
          path="comments"
          element={<Comments />}
          loader={commentsLoader}
          action={commentsAction}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
