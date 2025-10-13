import React from 'react'
import Navbar from './Component/Navbar/Navbar'
import Sidebar from './Component/Sidebar/Sidebar'
import { Routes,Route } from 'react-router-dom'
import Orders from './Pages/Orders/Orders'
import Add from './Pages/Add/Add'
import List from './Pages/List/List'
import { ToastContainer } from 'react-toastify';




const App = () => {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000}/>
      <Navbar />
      <hr />
      <div className='app-content'>
       <Sidebar />
       <Routes>
        <Route path = "/add" element= {<Add/>}/>
        <Route path = "/list" element= {<List/>}/>
        <Route path = "/orders" element= {<Orders/>}/>
       </Routes>
      </div>
    </div>
  )
}

export default App
