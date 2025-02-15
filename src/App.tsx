import React from 'react'
import { Footer, Navbar } from "./components/index";
import { Outlet } from 'react-router';

const App: React.FC = () => {
  return (
    <>
      
      <Outlet />
     
    </>
  )
}

export default App
