import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { UnauthenticatedPaths } from "../constants/paths";
import { PageLoading } from "../components/PageLoading";

const Login = lazy(() =>
  import("../pages/UnauthenticatedPages/Login").then(({ Login }) => ({
    default: Login,
  }))
);

const Register = lazy(() =>
  import("../pages/UnauthenticatedPages/Register").then(({ Register }) => ({
    default: Register,
  }))
);

export const UnauthenticatedRoutes: React.FC = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        <Route path={UnauthenticatedPaths.login} element={<Login />} />
        <Route path={UnauthenticatedPaths.register} element={<Register />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Suspense>
  );
};
