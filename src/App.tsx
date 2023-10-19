import { BrowserRouter } from "react-router-dom";
import { UnauthenticatedRoutes } from "./routes/UnauthenticatedRoutes";
import { PageLayout } from "./components/PageLayout";
import { AuthenticatedRoutes } from "./routes/AuthenticatedRoutes";
import { useAuth } from "./contexts/AuthContext";

export function App() {
  const { signed } = useAuth();

  return (
    <BrowserRouter>
      {signed ? (
        <PageLayout>
          <AuthenticatedRoutes />
        </PageLayout>
      ) : (
        <UnauthenticatedRoutes />
      )}
    </BrowserRouter>
  );
}
