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
      <Login path='/login' />
      <Dashboard path='/document' />
      <Onboarding path='/' />
    </Router>
  )
};

export default Pages;
