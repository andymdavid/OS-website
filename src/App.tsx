import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/Home';
import Company from './routes/Company';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/company',
    element: <Company />,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
