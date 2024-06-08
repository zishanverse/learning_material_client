import React from 'react';
import { CiMenuFries } from "react-icons/ci";
import { MdOutlineSettings } from "react-icons/md";

const Navbar = () => {
  return (
    <div className='navbar'>
        <CiMenuFries className="icon"/>
        <ul></ul>
        <MdOutlineSettings className="icon"/>
        
    </div>
  )
}

export default Navbar