import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthenticatedPaths } from "../constants/paths";

const Home = lazy(() =>
  import("../pages/AuthenticatedPages/Home").then(({ Home }) => ({
    default: Home,
  }))
);

const NotFound = lazy(() =>
  import("../pages/NotFound").then(({ NotFound }) => ({
    default: NotFound,
  }))
);

export const AuthenticatedRoutes: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Home */}
        <Route path={AuthenticatedPaths.home} element={<Home />} />
        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

const Loading: React.FC = () => {
  return <div>Carregando</div>;
};