import React, { Fragment } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navigation from "./components/navigation/Navigation";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";

// Route protecter
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? (
    <Fragment>{children}</Fragment>
  ) : (
    <Navigate to="/" />
  );
};

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Navigation>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
          </Routes>
        </Navigation>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
