import React from 'react'
import Navbar from '../components/Navbar';

const MainLayout = ({ children }) => {
  return (
    <>
      <div className="bg-gradient-to-t from-emerald-700 from-30%  to-gray-900 to-90% relative h-screen w-screen overflow-x-hidden">
        <Navbar />
        {children}
      </div>
    </>
  );
}

export default MainLayout;