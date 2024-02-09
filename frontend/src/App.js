import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from 'react-router-dom';

import Home from './pages/Home';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

import ProtectedRoute from './utils/ProtectedRoute';
import { AuthProvider } from './context/AuthProvider';

// To learn about auth with react
// https://dev.to/miracool/how-to-manage-user-authentication-with-react-js-3ic5

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='App'>
          {/* Navbar here */}

          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>

            {/* Protected Routes */}
            <Route exact path='/dashboard' element={<ProtectedRoute />}>
              <Route index element={<Dashboard />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
