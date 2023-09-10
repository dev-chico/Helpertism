import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthenticatedPaths } from "../constants/paths";
import { PageLoading } from "../components/PageLoading";

const Home = lazy(() =>
  import("../pages/AuthenticatedPages/Home").then(({ Home }) => ({
    default: Home,
  }))
);

const Profile = lazy(() =>
  import("../pages/AuthenticatedPages/Profile").then(({ Profile }) => ({
    default: Profile,
  }))
);

const Posts = lazy(() =>
  import("../pages/AuthenticatedPages/Posts").then(({ Posts }) => ({
    default: Posts,
  }))
);

const NotFound = lazy(() =>
  import("../pages/NotFound").then(({ NotFound }) => ({
    default: NotFound,
  }))
);

export const AuthenticatedRoutes: React.FC = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        {/* Home */}
        <Route path={AuthenticatedPaths.home} element={<Home />} />
        <Route path={AuthenticatedPaths.profile} element={<Profile />} />
        <Route path={AuthenticatedPaths.posts} element={<Posts />} />
        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
