import React from 'react';
import { FaRegFilePdf } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

const Teacherpdfitem = (props) => {
  const {item} = props;
  return (
    <li className='teacher-pdf-detail' >
              <hr className='line'/>
              <div className='pdf-details'>
                <p className='pdf-text'>File name: <span className='pdf-data-text'>{item.filename}</span></p>
                <p className='pdf-text'>Date: <span className='pdf-data-text'>{item.created_at}</span></p>
                <p className='pdf-text'>File Size: <span className='pdf-data-text'>{item.size} MB</span></p>
                <div className='tags-flex'>
                  <span className='pdf-text'>Tags: </span>
                  {item.tags.map(eachtag => <span key={eachtag.id} className='tag-name'>{eachtag.value}</span>)}
                </div>
                <div className='techer-pdf-btns-card'>
                  <button type="button" className='view-download' >
                    <FaRegFilePdf className='view-download-btn'/>
                    View
                  </button>
                  <button type="button" className='view-download'>
                    <FaDownload  className='view-download-btn'/>
                    Download
                  </button>
                  <button type="button" className='delete'>
                    <MdDelete />
                  </button>
                </div>
              </div>
            </li>
  )
}

export default Teacherpdfitem