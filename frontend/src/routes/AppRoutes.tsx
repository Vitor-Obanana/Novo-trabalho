import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from '../pages/Products';
import Cursos from '../pages/Courses'; // ✅ Aqui está a correção

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/products" element={<Products />} />
      <Route path="/courses" element={<Cursos />} /> {/* ✅ Corrigido */}
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;

