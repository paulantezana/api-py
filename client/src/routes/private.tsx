import { createBrowserRouter } from "react-router-dom";
import LoginPage from './../pages/LoginPage';

import AdminLayout  from "layout/AdminLayout";
import ErrorPage from "pages/ErrorPage";
import User from "pages/admin/maintenance/User";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'maintenance',
        children: [
          {
            path: 'user',
            element: <User/>,
          }
        ]
      }
    ]
  },
]);

export default router;