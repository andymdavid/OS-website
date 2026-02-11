import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/Home';
import Company from './routes/Company';
import LevelUp from './routes/LevelUp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/company',
    element: <Company />,
  },
  {
    path: '/levelup',
    element: <LevelUp />,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
