import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Signin from './components/Signin/Signin'
import Signup from './components/Signup/Signup'
import Home from './pages/Home/Home'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signin />} /> 
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>    </div>
  )
}

export default App