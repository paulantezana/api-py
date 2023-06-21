import { RouterProvider } from "react-router-dom";
import './app.css';

import privateRouter from 'routes/private';

function App() {
  return (
    <RouterProvider router={privateRouter} />
  );
}

export default App;
