import React, { useEffect, useState } from 'react'
import { Routes, Route} from 'react-router-dom'
import Signin from './components/Signin/Signin'
import Signup from './components/Signup/Signup'
import Home from './pages/Home/Home'


const App = () => {

  const [products, setProducts] = useState([]);

  useEffect(()=>{
    const handleProducts = async() =>{
      const response = await fetch("http://localhost:3000/products", {
        method: "GET",
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      console.log(data)
      setProducts(data);
  }
  handleProducts()
  },[])

  
  // handleProducts()
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signin />} /> 
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home/>} />
      </Routes>    
    </div>
  )
}

export default App