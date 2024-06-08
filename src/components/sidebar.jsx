import React from 'react'
import './style.css';

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className='logo-card'>
            <img className='logo' src="https://tse2.mm.bing.net/th?id=OIP.xpcsEbvuiB7jx0Yec20D-AHaHg&pid=Api&P=0&h=180" alt="logo" />
        </div>
        <ul className='bars'>
            <li className='bar'>Dashboard</li>
            <li className='bar'>Upload</li>
            <li className='bar'>Students</li>
        </ul>
    </div>
  )
}

export default Sidebar