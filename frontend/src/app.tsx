import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Cursos from './pages/Courses';
import NovaMateria from './pages/Materia';
import AtualizarMateria from './pages/AtualizarMateria'; 
import DeletarMateria from './pages/DeletarMateria';     

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/courses" element={<Cursos />} />
        <Route path="/materias" element={<NovaMateria />} />
        <Route path="/materias/editar/:id" element={<AtualizarMateria />} /> 
        <Route path="/materias/deletar/:id" element={<DeletarMateria />} />   
      </Routes>
    </BrowserRouter>
  );
};

export default App;
