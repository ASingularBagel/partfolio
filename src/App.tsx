/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Main from './pages/Main'
import NewUserInfo from './pages/NewUserInfo'
import UploadIllustration from './pages/UploadIllustration'

import { AuthProvider } from './context/auth'
import { useAccountName } from './hooks/useAccountName';
import { useAuth } from './hooks/useAuth';

import PublicRoute from './routes/PublicRoute';
import MidRoute from './routes/MidRoute';
import IsLoading from './components/IsLoading'

function App() {
  const { user } = useAuth();
  const { accountName } = useAccountName();
  // if(accountName === null || user === null) {
  //   return <IsLoading />
  //   }
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={
          <MidRoute>
            <Home />
          </MidRoute>
        } />
        <Route path="/Signup" element={
        <PublicRoute >
          <Signup />
        </PublicRoute>} />
        <Route path="/Login" element={
        <PublicRoute >
          <Login />
        </PublicRoute>} />
        <Route path="/Main" element={
          <Main />
        } />
        <Route path="/NewUserInfo" element={
          <NewUserInfo />
        } />
        <Route path={`/${accountName}/uploadillustration`} element={<UploadIllustration />} />
        <Route path="*" element={
          <NotFound />
        } />
      </Routes>
    </AuthProvider>
  );
}

export default App
