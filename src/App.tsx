import { BrowserRouter } from "react-router-dom";
import { UnauthenticatedRoutes } from "./routes/UnauthenticatedRoutes";
import { PageLayout } from "./components/PageLayout";
import { AuthenticatedRoutes } from "./routes/AuthenticatedRoutes";

export function App() {
  const signed = true;

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
