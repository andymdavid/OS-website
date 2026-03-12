import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/Home';
import HomeDuplicate from './routes/HomeDuplicate';
import Company from './routes/Company';
import LevelUp from './routes/LevelUp';
import Speedrun from './routes/Speedrun';
import MarginalGains from './routes/MarginalGains';
import TheGoodStuff from './routes/TheGoodStuff';
import Writing from './routes/Writing';
import WritingPost from './routes/WritingPost';
import About from './routes/About';
import Games from './routes/Games';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeDuplicate />,
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
  {
    path: '/writing',
    element: <Writing />,
  },
  {
    path: '/games',
    element: <Games />,
  },
  {
    path: '/writing/post',
    element: <WritingPost />,
  },
  {
    path: '/about',
    element: <About />,
  },
  // Archived pages (noindex)
  {
    path: '/archive/home',
    element: <Home />,
  },
  {
    path: '/archive/company',
    element: <Company />,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
