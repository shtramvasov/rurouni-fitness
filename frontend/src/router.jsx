import { createBrowserRouter, redirect } from 'react-router-dom'
import PrivateRoute from "./PrivateRoute";
import DashboardPage from "@pages/Dashboard/DashboardPage";
import LoginPage from "@pages/Login/LoginPage";
import ExercisesListPage from "@pages/ExercisesList/ExercisesListPage";
import ExercisePage from "@pages/ExercisePage/ExercisePage";
import SessionsListPage from "@pages/SessionsListPage/SessionsListPage";
import PassPage from '@pages/Pass/PassPage';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        index: true,
        element: <DashboardPage />
      },
      {
        path: '/exercises',
        element: <ExercisesListPage />
      },
      {
        path: '/exercises/:exercise_id',
        element: <ExercisePage />
      },
      {
        path: '/sessions',
        element: <SessionsListPage />
      },
      {
        path: '/pass',
        element: <PassPage />
      },
      {
        path: '/*',
        element: <DashboardPage />,
        loader: () => redirect('/')
      },
    ]
  }
])