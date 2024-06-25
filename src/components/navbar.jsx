import React from 'react';
import { CiMenuFries } from "react-icons/ci";
import { MdOutlineSettings } from "react-icons/md";
import { IoIosHelp } from "react-icons/io";
import { FaExternalLinkAlt } from "react-icons/fa";
import {Link} from 'react-router-dom';
import './style.css';

const Navbar = () => {
  return (
    <div className='navbar'>
      <Link to="/" className="link">
      <div className='logo-card'>
        <img className='logo' src='https://tse3.mm.bing.net/th?id=OIP._XUn9Hi5PpX1r4ZbEYYW_gHaHa&pid=Api&P=0&h=180' alt="logo" />
        <p className='app-name'>Bigbooster Tech</p>
      </div>
      </Link>
      <div className='help-website'>
        <div className='help-card'>
          <IoIosHelp className='help-logo' />
          <p>Help</p>
        </div>
        <hr className="line-between" />
        <div className='website-card'>
          <p className='nav-text'>website</p>
          <FaExternalLinkAlt className='website-logo'/>
        </div>

      </div>
        
    </div>
  )
}

export default Navbar