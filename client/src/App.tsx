import { RouterProvider } from "react-router-dom";
import './app.css';
import 'antd/dist/reset.css';

import privateRouter from 'routes/private';
import publicRouter from 'routes/public'
import { LOGIN_KEY } from "helpers/settings";
import LocalStorageService from "services/localStorage";

function App() {
  const hasLogin = LocalStorageService.getItem(LOGIN_KEY);
  return (
    <RouterProvider router={hasLogin?.token ? privateRouter : publicRouter} />
  );
}

export default App;
