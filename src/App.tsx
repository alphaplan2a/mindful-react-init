import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { AppWrapper } from "./components/AppWrapper";
import { PageLoader } from "./components/PageLoader";
import { usePageTracking } from "./hooks/usePageTracking";
import { mainRoutes } from "./routes/mainRoutes";
import { mondeFioriRoutes } from "./routes/mondeFioriRoutes";
import { serviceRoutes } from "./routes/serviceRoutes";

// Wrapper component to implement tracking
const TrackingWrapper = ({ children }: { children: React.ReactNode }) => {
  usePageTracking();
  return <>{children}</>;
};

const App = () => (
  <ErrorBoundary>
    <AppWrapper>
      <BrowserRouter>
        <TrackingWrapper>
          <AnimatePresence mode="wait">
            <Routes>
              {[...mainRoutes, ...mondeFioriRoutes, ...serviceRoutes].map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <Suspense fallback={<PageLoader />}>
                      {route.element}
                    </Suspense>
                  }
                />
              ))}
            </Routes>
          </AnimatePresence>
        </TrackingWrapper>
      </BrowserRouter>
    </AppWrapper>
  </ErrorBoundary>
);

export default App;