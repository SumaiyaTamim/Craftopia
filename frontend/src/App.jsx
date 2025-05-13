import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import { Toaster } from 'react-hot-toast'
import Purchases from "./components/Purchases";
import Buy from "./components/Buy";
import Courses from "./components/Courses";

function App() {
  return ( <div>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>

       <Route path="/courses" element={<Courses />} />
      <Route path="/buy/:courseId" element={<Buy />} />
      <Route path="/purchases" element={<Purchases/>}/>
    </Routes>
    <Toaster/>
    </div>
  )
}

export default App