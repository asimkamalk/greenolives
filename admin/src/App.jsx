import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes, Navigate } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import Login from "./pages/Login/Login";
import Sales from "./pages/Sales/Sales";
import Settings from "./pages/Settings/Settings";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");

  return (
    <div className="app">
      <ToastContainer />
      {token && <Navbar setToken={setToken} />}
      {token && <hr />}
      <div
        className="app-content"
        style={{
          justifyContent: token ? undefined : "center",
          alignItems: token ? undefined : "center",
          minHeight: token ? undefined : "100vh",
          width: "100%",
        }}
      >
        {token && <Sidebar />}
        <Routes>
          <Route
            path="/"
            element={
              token ? (
                <ProtectedRoute>
                  <List />
                </ProtectedRoute>
              ) : (
                <Login setToken={setToken} />
              )
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <Add />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sales"
            element={
              <ProtectedRoute>
                <Sales />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
