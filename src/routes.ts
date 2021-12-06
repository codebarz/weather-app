import { lazy } from 'react';

const HomePage = lazy(() => import('./app/pages/Home'));

const AppRoutes = [{ path: '/', component: HomePage }];

export default AppRoutes;
