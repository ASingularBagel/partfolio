import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Main from './pages/Main'
import NewUserInfo from './pages/NewUserInfo'

import { AuthProvider } from './context/auth'

import PublicRoute from './routes/PublicRoute';
import MidRoute from './routes/MidRoute';

function App() {

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
        <Route path="*" element={
          <NotFound />
        } />
        <Route path="/Main" element={
          <Main />
        } />
        <Route path="/NewUserInfo" element={
          <NewUserInfo />
        } />
        {/*<Route path="/about" element={<About />} />
        <Route path="/:user" element={<User />} />
        <Route path="/:user/:id" element={<User />} />
        <Route path="*" element={<NoMatch />} />*/}
      </Routes>
    </AuthProvider>

  )
}

export default App
