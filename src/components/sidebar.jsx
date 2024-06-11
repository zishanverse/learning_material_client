import React from 'react';
import {Link} from 'react-router-dom';
import { RiHome3Fill } from "react-icons/ri";
import { BsFiletypePdf } from "react-icons/bs";
import { FaFileInvoice } from "react-icons/fa6";
import './style.css';

const Sidebar = () => {
  return (
    <div className='sidebar'>
        
        <ul className='bars'>
            <li className='bar'>
              <RiHome3Fill className='side-logo' />
              Dashboard
            </li>
            <Link to="/techer/upload" className='link'>
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
          <li className='bar below'>
            <img src="https://s3-alpha-sig.figma.com/img/c60c/f27b/0272b2f6015a21b7a2715fb35d513c43?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CExmb-S3FxHDk-iic2sL-b8keeZakr21YhtAFjp7mNjDx~dkU~l-eBhaKx4JLvWvCWxmCgRNblULa-mnwHeXHSIzJ~SAYEfMJ-2LA5zjq38EfOiPHIYf4FcyCxp6cOqa-i7iGRVxQnrDEPxfxqJn0OUt-rY0ehTRR54cNDINjgz5i~qk27hBJtINiCV37yAzS2LcYLObpgRdSII65XUrVCKY7HFt15MhYHImv36E-AuTpgvl0BfUX1dwt0TiFlasMHVJyx23s2iNMn~WSXpEiv9ZXOgY88aVe04fzd-vWQqhIuLIHJGW8zbMi7dHqKIQqQWNcFCF17dnhp6u98EDow__" alt="subscription" className='side-logo' />
            <p className='sidebar-text'> Bigbooster</p>
          </li>
          <li className='bar below'>
            <img src="https://s3-alpha-sig.figma.com/img/005e/e6da/af7ad56b719af70e73a5f400f2820d3b?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SkdnVUclOmZJhTHHmaH4mgByBlmbDvL17~YbB0KTJT6VHnXrDaCfKexTkS6qwfOMUj7BWYw-GDs5h5bO2Pwf86C-ohprMOBGKDnh2UhVcgcUWiCqcSidL1ZrrOKnpot2LFDB0QnXCPx29IBB5xU-fCud4ykH3CI-X8ZPHW8laX54Mw2dIEZFUojk~5cpAyv16tljq1lKJyQeJgCocTHGdElnlzzO0JCNsqhzZPZ~4bRsVObrphyLxmkHBlUW81wInPxRQ3VGtk6t1EZ8mtVZ077LHyCjVRbaCGcJac1n2MrvUqxDSp-VyXccXDBQk0lFr6RZyNTYWW3KlVgSynOtXQ__" alt="log out" className='side-logo' />
            <p className='sidebar-text'> Go to student</p>
          </li>
        </ul>
    </div>
  )
}

export default Sidebar