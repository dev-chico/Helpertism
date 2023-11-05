import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { ToastContainer } from "./components/Toast/ToastContainer/index.tsx";
import "./assets/css/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ToastContainer />
      <App />
    </AuthProvider>
  </React.StrictMode>
);
