// src/App.jsx
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayouts";
const Home = lazy(() => import("./Pages/Home"));
import Login from "./Pages/Login";



export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} /> 
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Suspense>
  );
}
