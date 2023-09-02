import React from "react";
import { AuthenticatedRoutes } from "./AuthenticatedRoutes";
import { UnauthenticatedRoutes } from "./UnauthenticatedRoutes";

export const Routes: React.FC = () => {
  const signed = true;

  return signed ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />;
};
