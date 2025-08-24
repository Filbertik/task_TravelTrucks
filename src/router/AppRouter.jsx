import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CatalogPage from "../pages/CatalogPage";
import CamperDetailsPage from "../pages/CamperDetailsPage";
import Layout from "../components/Layout";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<CamperDetailsPage />} />
        <Route path="*" element={<Navigate to="/catalog" replace />} />
      </Route>
    </Routes>
  );
}
