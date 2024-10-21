// AppRoutes.tsx (or Root.tsx)
import React from "react";
import { Route, Routes } from "react-router-dom"; // Remove Router
import App from "./Pages/HomePage";
import UniqueCards from "./Pages/UniqueCards";
import Navigation from "./Components/Navbar";

const AppRoutes: React.FC = () => (
  <>
  <Navigation/>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/:pokemonName" element={<UniqueCards />} />
  </Routes>
  </>
);

export default AppRoutes;
