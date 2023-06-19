import { RouterProvider } from "react-router-dom";
// import publicRouter from './routes/public';

import privateRouter from 'routes/private';

function App() {
  return (
    <RouterProvider router={privateRouter} />
  );
}

export default App;
