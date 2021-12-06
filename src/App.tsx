import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import ErrorBoundary from './ErrorBoundary';
import routes from './routes';
import LoadingIndicator from './app/components/LoadingIndicator';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Suspense fallback={LoadingIndicator}>
          <Router>
            <Routes>
              {routes?.map(({ path, component: Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
              <Route path="*" element={<p>Not Found</p>} />
            </Routes>
          </Router>
        </Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default App;
