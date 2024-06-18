import React,{useState} from 'react';
import axios from 'axios';
import { FaRegFilePdf } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { ColorRing } from 'react-loader-spinner';

const Teacherpdfitem = (props) => {
  const [status, setStatus] = useState("INITIAL");
  const [link, setLink] = useState("");
  
  const {item, func, get} = props;

  const deleteItem = async(name) => {
    const opt = {method: "DELETE", url: `https://learning-material-backend.onrender.com/delete?name=${name}`}
    const res = await axios(opt);
    get();
  }

  const  getLink = async(name) => {
    setStatus("LOADING");
    const li = await func(name);
    setLink(li);
    console.log(li);
    setStatus("SUCCESS");
  }

  const initial = () => 
    <button type="button" className='view-download' onClick={() => getLink(item.filename)}>
      <FaRegFilePdf className='view-download-btn'/>
      View      
    </button>

  const success = () => 
  <div className='view-download'>
    <a href={link} rel='noreferrer' target='_blank' className="link">Open</a>
  </div>
  const loading = () => (
    <div className='view-download'>
    <ColorRing
      visible={true}
      height="20"
      width="20"
      ariaLabel="color-ring-loading"
      wrapperStyle={{}}
      wrapperClass="color-ring-wrapper"
      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
      </div>)

  

  const render = () => {
    switch(status) {
      case "INITIAL":
        return initial();
      case "SUCCESS":
        return success();
      case "LOADING":
        return loading();
      default:
        return null;
    }
  }
  return (
    <li className='teacher-pdf-detail' >
              <hr className='line'/>
              <div className='pdf-details'>
                <p className='pdf-text'>File name: <span className='pdf-data-text'>{item.filename}</span></p>
                <p className='pdf-text'>Date: <span className='pdf-data-text'>{item.created_at}</span></p>
                <p className='pdf-text'>File Size: <span className='pdf-data-text'>{item.size} MB</span></p>
                <p className='pdf-text'>Duration: <span className='pdf-data-text'>{item.duration} Min.</span></p>
                <p className='pdf-text'>Marks: <span className='pdf-data-text'>{item.marks}</span></p>
                <div className='tags-flex'>
                  <span className='pdf-text'>Tags: </span>
                  {item.tags.map(eachtag => <span key={eachtag.id} className='tag-name'>{eachtag.value}</span>)}
                </div>
                <div className='techer-pdf-btns-card'>
                    {render()}
                  
                  <button type="button" className='view-download' onClick={() => func(item.filename)}>
                    <FaDownload  className='view-download-btn'/>
                    Download
                  </button>
                  <button type="button" className='delete' onClick={() => deleteItem(item.filename)}>
                    <RiDeleteBin6Fill />
                  </button>
                </div>
                <p className='pdf-text des'>Description: <span className='pdf-data-text'>{item.description}</span></p>
              </div>
            </li>
  )
}

export default Teacherpdfitem