import React from 'react';
import { CiMenuFries } from "react-icons/ci";
import { MdOutlineSettings } from "react-icons/md";
import { IoIosHelp } from "react-icons/io";
import { FaExternalLinkAlt } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='logo-card'>
        <img className='logo' src='https://s3-alpha-sig.figma.com/img/8d9b/5095/6a5d36c05aa4aa2e27dc4c25d2d1e9dd?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=D4FD46AmPe9~psMlX6w3Q7QaZj77K~mT5WA6Pnt-1vLg2OkO5kiw8xB6AupAepjyzJal-PbUluAcQ4B~GvtIJbLjUnRun85dE2ta2nbaAJM8twrpg7H0Tuuf1CgYQwp1Koc-N0mjvHcKhElZoYntZRWOqIc3rE4b2fnze4SGenUeUiUAOMSMBhvp~ls9ltz7BpBkFK~HFT8W4Su-GsvXS54svhW8L0bxx0uaIuPCqSL4LV2jvz~ispF-U9H24aYJmxFdvhCqt71dFzimyLnIbMTvYRbCxuIn5y3Tj7JOh~6EfVi7ljU17DV9sI-mWS1eKLo~kIj-Ya2zC0nqLtDMGg__' alt="logo" />
        <p className='app-name'>Bigbooster Tech</p>
      </div>
      <div className='help-website'>
        <div className='help-card'>
          <IoIosHelp className='help-logo' />
          <p>Help</p>
        </div>
        <div className='website-card'>
          <p className='nav-text'>website</p>
          <FaExternalLinkAlt className='website-logo'/>
        </div>

      </div>
        
    </div>
  )
}

export default Navbar