import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Signup" element={<Signup />} />
      {/*<Route path="/about" element={<About />} />
      <Route path="/:user" element={<User />} />
      <Route path="/:user/:id" element={<User />} />
      <Route path="*" element={<NoMatch />} />*/}
    </Routes>
  )
}

export default App
