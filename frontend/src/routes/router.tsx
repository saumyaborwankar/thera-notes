import { createBrowserRouter } from "react-router-dom";
import { TAB_NAMES } from "./tabNames";
import Login from "../components/pages/Login";
import Homepage from "../components/pages/Homepage";
import Register from "../components/pages/Register";
import { RootAppOutlet } from "../components/auth/RootAppOutlet";
import { Profile } from "../components/pages/Profile";
import { AppLayout } from "../components/pages/AppLayout";
import { Clients } from "../components/pages/Clients";

export const router = createBrowserRouter([
  {
    element: <RootAppOutlet />,
    children: [
      // { path: `/`, element: <Homepage /> },
      {
        path: `/`,
        element: <AppLayout />,
        children: [{ path: "/clients", element: <Clients /> }],
      },

      { path: `/:username`, element: <Profile /> },
    ],
  },
  { path: `/${TAB_NAMES.login}`, element: <Login /> },
  { path: `/${TAB_NAMES.register}`, element: <Register /> },
]);
