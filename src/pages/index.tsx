import React from 'react';
import { Router } from '@reach/router';
import Onboarding from './Onboarding';
import Login from './Login';
import ProtectedRoute from '../components/ProtectedRoute';
import Dashboard from './Dashboard';

const Pages: React.FC = () => {
  return (
    <Router>
      <ProtectedRoute component={Dashboard} path='/dashboard' />
        <Onboarding path='/' />
      <Login path='/login' />
      <Dashboard path='/document' />
    </Router>
  )
};

export default Pages;
