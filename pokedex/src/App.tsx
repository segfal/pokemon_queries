// AppRoutes.tsx (or Root.tsx)
import React from "react";
import { Route, Routes } from "react-router-dom"; // Remove Router
import App from "./Pages/HomePage";
import UniqueCards from "./Pages/UniqueCards";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/:pokemonName" element={<UniqueCards />} />
  </Routes>
);

export default AppRoutes;
