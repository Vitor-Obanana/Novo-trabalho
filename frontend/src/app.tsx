import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Cursos from './pages/Courses'; // ✅ importa o componente de cursos

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/courses" element={<Cursos />} /> {/* ✅ adiciona a rota */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;


