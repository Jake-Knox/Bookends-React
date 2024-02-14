import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from 'react-router-dom';

import './App.scss';

import Home from './pages/Home';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Bookshelf from './pages/Bookshelf';
import Follows from './pages/Follows';

import ProtectedRoute from './utils/ProtectedRoute';
import { AuthProvider } from './context/AuthProvider';

// To learn about auth with react
// https://dev.to/miracool/how-to-manage-user-authentication-with-react-js-3ic5

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='App'>
          <Navbar />

          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route exact path="/:username/bookshelf" element={<Bookshelf />}></Route>
            <Route exact path="/:username/follows" element={<Follows />}></Route>

            <Route exact path='/dashboard' element={<ProtectedRoute />}>
              {/* Protected Routes */}
              <Route index element={<Dashboard />} />
            </Route>
          </Routes>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
