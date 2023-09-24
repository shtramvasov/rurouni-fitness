import Dashboard from "@pages/Dashboard/DashboardPage";
import Login from "@pages/Login/LoginPage";
import { createBrowserRouter } from 'react-router-dom'
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        index: true,
        element: <Dashboard />
      }
    ]
  }
])