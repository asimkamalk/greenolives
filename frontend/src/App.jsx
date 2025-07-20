import React, { useState } from 'react'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import LoginPopup from './components/LoginPopup/LoginPopup'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import MyOrders from './pages/MyOrders/MyOrders'
import Profile from './pages/Profile'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify/Verify'
import DynamicBucket from './components/DynamicBucket/DynamicBucket'
import { AnimatePresence, motion } from 'framer-motion'
import MyFavorites from './pages/MyFavorites';

const App = () => {

  const [showLogin,setShowLogin] = useState(false);
  const location = useLocation();

  return (
    <>
    <ToastContainer/>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className='app w-full max-w-6xl mx-auto px-2 sm:px-4 md:px-8'>
        <Navbar setShowLogin={setShowLogin}/>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path='/' element={
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
                <Home />
              </motion.div>
            }/>
            <Route path='/cart' element={
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
                <Cart />
              </motion.div>
            }/>
            <Route path='/order' element={
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
                <PlaceOrder />
              </motion.div>
            }/>
            <Route path='/myorders' element={
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
                <MyOrders />
              </motion.div>
            }/>
            <Route path='/profile' element={
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
                <Profile />
              </motion.div>
            }/>
            <Route path='/verify' element={
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
                <Verify />
              </motion.div>
            }/>
            <Route path='/myfavorites' element={
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
                <MyFavorites />
              </motion.div>
            }/>
          </Routes>
        </AnimatePresence>
      </div>
      <DynamicBucket />
      <Footer />
    </>
  )
}

export default App
