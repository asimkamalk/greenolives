import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  }
  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="" />
      <img className='profile' src={assets.profile_image} alt="" />
      <button className='admin-logout-btn' onClick={logout} style={{marginLeft: '20px'}}>Logout</button>
    </div>
  )
}

export default Navbar
