import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/Home';
import HomeDuplicate from './routes/HomeDuplicate';
import Company from './routes/Company';
import LevelUp from './routes/LevelUp';
import Speedrun from './routes/Speedrun';
import MarginalGains from './routes/MarginalGains';
import TheGoodStuff from './routes/TheGoodStuff';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/home-duplicate',
    element: <HomeDuplicate />,
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
  {
    path: '/marginal-gains',
    element: <MarginalGains />,
  },
  {
    path: '/the-good-stuff',
    element: <TheGoodStuff />,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
