import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import Wallet from './Wallet/Wallet';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/wallet" element={ <Wallet /> } />
    </Routes>
  );
}

export default App;
