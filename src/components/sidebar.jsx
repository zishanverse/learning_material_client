import React from 'react';
import {Link} from 'react-router-dom';
import { RiHome3Fill } from "react-icons/ri";
import { BsFiletypePdf } from "react-icons/bs";
import { FaFileInvoice } from "react-icons/fa6";
import { BsFileMedicalFill } from "react-icons/bs";
import { PiStudentBold } from "react-icons/pi";
import './style.css';

const Sidebar = () => {
  return (
    <div className='sidebar'>
        
        <ul className='bars'>
            <li className='bar'>
              <RiHome3Fill className='side-logo' />
              Dashboard
            </li>
            <Link to="/teacher/upload" className='link'>
            <li className='bar'>
              <BsFiletypePdf className='side-logo'/>
              Upload
            </li>
            </Link>
            <Link to="/teacher/all-pdfs" className='link'><li className='bar'>
              <FaFileInvoice className='side-logo'/>
              All PDFs
            </li>
            </Link>
        </ul>
        <ul className='bars'>
          <Link to="/" className='link'>
            <li className='bar'>
              <BsFileMedicalFill className='side-logo'/>
              <p className='sidebar-text'> Bigbooster</p>
            </li>
          </Link>
          <Link to="/student" className='link'>
          <li className='bar'>
            <PiStudentBold className='side-logo'/>
            <p className='sidebar-text'>Go to student</p>
          </li>
          </Link>
        </ul>
    </div>
  )
}

export default Sidebar