import React from 'react';
import { Router } from '@reach/router';
import Onboarding from './Onboarding';
import Login from './Login';
import ProtectedRoute from '../components/ProtectedRoute';
import Dashboard from './Dashboard';
import Welcome from './Welcome';

const Pages: React.FC = () => {
  return (
    <Router>
      <Login path='/login' />
      <Dashboard path='/document' />
      <Onboarding path='/onboarding' />
      <Welcome path='/' />
    </Router>
  )
};

export default Pages;
