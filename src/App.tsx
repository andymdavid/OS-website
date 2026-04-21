import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const ArchiveHome = lazy(() => import('./routes/ArchiveHome'));
const Company = lazy(() => import('./routes/Company'));
const LevelUp = lazy(() => import('./routes/LevelUp'));
const Speedrun = lazy(() => import('./routes/Speedrun'));
const MarginalGains = lazy(() => import('./routes/MarginalGains'));
const TheGoodStuff = lazy(() => import('./routes/TheGoodStuff'));
const Writing = lazy(() => import('./routes/Writing'));
const WritingPost = lazy(() => import('./routes/WritingPost'));
const About = lazy(() => import('./routes/About'));
const Games = lazy(() => import('./routes/Games'));
const Terms = lazy(() => import('./routes/Terms'));
const Privacy = lazy(() => import('./routes/Privacy'));
const NotFound = lazy(() => import('./routes/NotFound'));

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <SuspenseWrapper><Home /></SuspenseWrapper>,
  },
  {
    path: '/levelup',
    element: <SuspenseWrapper><LevelUp /></SuspenseWrapper>,
  },
  {
    path: '/speedrun',
    element: <SuspenseWrapper><Speedrun /></SuspenseWrapper>,
  },
  {
    path: '/marginal-gains',
    element: <SuspenseWrapper><MarginalGains /></SuspenseWrapper>,
  },
  {
    path: '/the-good-stuff',
    element: <SuspenseWrapper><TheGoodStuff /></SuspenseWrapper>,
  },
  {
    path: '/writing',
    element: <SuspenseWrapper><Writing /></SuspenseWrapper>,
  },
  {
    path: '/games',
    element: <SuspenseWrapper><Games /></SuspenseWrapper>,
  },
  {
    path: '/writing/post',
    element: <SuspenseWrapper><WritingPost /></SuspenseWrapper>,
  },
  {
    path: '/about',
    element: <SuspenseWrapper><About /></SuspenseWrapper>,
  },
  {
    path: '/terms',
    element: <SuspenseWrapper><Terms /></SuspenseWrapper>,
  },
  {
    path: '/privacy',
    element: <SuspenseWrapper><Privacy /></SuspenseWrapper>,
  },
  // Archived pages (noindex)
  {
    path: '/archive/home',
    element: <SuspenseWrapper><ArchiveHome /></SuspenseWrapper>,
  },
  {
    path: '/archive/company',
    element: <SuspenseWrapper><Company /></SuspenseWrapper>,
  },
  // Catch-all 404
  {
    path: '*',
    element: <SuspenseWrapper><NotFound /></SuspenseWrapper>,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
