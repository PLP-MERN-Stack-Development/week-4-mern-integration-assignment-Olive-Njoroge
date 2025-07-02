import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Layout from './components/Layout';
import PostList from './pages/PostList';
import PostForm from './pages/PostForm';
import Login from './pages/Login';
import Signup from './pages/Signup';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for token
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/posts" /> : <Navigate to="/signup" />
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/posts" element={<Layout />}>
          <Route index element={<PostList />} />
          <Route path="create" element={<PostForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
