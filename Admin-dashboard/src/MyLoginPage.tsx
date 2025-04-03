// src/MyLoginPage.tsx
import { Login, LoginForm } from 'react-admin';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';

const MyLoginPage = () => (
  <Login>
    <LoginForm 
      
      defaultValues={{ email: '', password: '' }}
    />
  </Login>
);

export default MyLoginPage;