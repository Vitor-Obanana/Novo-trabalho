import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Users from '../pages/Users';
import Projects from '../pages/Projects';
import Tasks from '../pages/Tasks';

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/users" element={<Users />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/tasks" element={<Tasks />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;