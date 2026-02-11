import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/Home';
import Company from './routes/Company';
import LevelUp from './routes/LevelUp';
import Speedrun from './routes/Speedrun';

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
  {
    path: '/speedrun',
    element: <Speedrun />,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
