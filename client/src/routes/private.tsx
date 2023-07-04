import { createBrowserRouter } from "react-router-dom";
import AdminLayout  from "layout/AdminLayout";
import ErrorPage from "pages/ErrorPage";
import PaginateTable from "pages/screen/PaginateTable/PaginateTable";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'screen/:id',
        element: <PaginateTable/>
      }
    ]
  },
]);

export default router;