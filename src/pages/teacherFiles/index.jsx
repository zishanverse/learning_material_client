import React from 'react';
import { FaSearch,FaRegFilePdf } from "react-icons/fa";
import {useEffect, useState} from 'react';
import axios from 'axios';
import { FallingLines } from 'react-loader-spinner';
import { FaDownload } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import './style.css';

const TeacherPdfItem =(item) => (
  <li className='teacher-pdf-detail' >
              <hr className='line'/>
              <div className='pdf-details'>
                <p className='pdf-text'>File name: <span className='pdf-data-text'>{item.filename}</span></p>
                <p className='pdf-text'>Date: <span className='pdf-data-text'>{item.created_at}</span></p>
                <p className='pdf-text'>File Size: <span className='pdf-data-text'>{item.size} MB</span></p>
                <div className='tags-flex'>
                  <span className='pdf-text'>Tags: </span>
                  {item.tags.map(each => <span className='tag-name'>{each}</span>)}
                </div>
                <div className='techer-pdf-btns-card'>
                  <button type="button" className='view-download' >
                    <FaRegFilePdf />
                    View
                  </button>
                  <button type="button" className='view-download'>
                    <FaDownload  />
                    Download
                  </button>
                  <button type="button" className='delete'>
                    <MdDelete />
                  </button>
                </div>
              </div>
            </li>
)


let initialList = [];

const TeacherPdf = () => {
  const [list, setList] = useState([]);
  const [sort, setSort] = useState("ASC");
  const [status, setStatus] = useState("INITIAL");

  useEffect(() => {
    getData();
  }, [sort]);

const getData = async () => {
    try {
        setStatus("LOADING");
        const opt = {method: "PUT", url: "https://learning-material-backend.onrender.com/all/pdf", headers: {"Content-Type": "application/json"}, data: {sort: sort}}
        const res = await axios(opt);
        const data = res.data;
        console.log(res.data);
        setList(data);
        initialList = data;
        setStatus("SUCCESS");
      }
      catch (error) {
        setStatus("FAILURE");
      }
  }
  const success = () => (
    <ul className='pdf-list-card'>
      {list.map(each => <TeacherPdfItem key={each.id} item={each}/>)}   
    </ul>
);

const loading = () => (
    <FallingLines
        color="#a3c2c2"
        width="100"
        visible={true}
        ariaLabel="falling-circles-loading"
    />
);

const failure = () => (
    <img src='https://turbo360.com/wp-content/uploads/2023/05/azure-logic-app-failure-alert.png' alt="failure" />
)
const render = () => {
  switch(status) {
      case "LOADING":
          return loading();
      case "SUCCESS":
          return success();
      case "FAILURE":
          return failure();
      default:
          return null;
  }
}
    return (
    <div className='flex'>
    <Navbar />
  <div className='side-content'>
    <Sidebar />
    <div className='content'>
      <div className="teacher-upload-container">
        <div className='search-calender'>
          <div className='search-container'>
            <FaSearch />
            <input type="search" placeholder="Search pdf by name, tags, subjects..." className='teacher-pdf-search'/>
          </div>
          <div className='calender-card'>
            <SlCalender className='calender-logo'/>
            <p className='date'>22-08-2023</p>
          </div>
        </div>
            {render()}
      </div>
      <div className='footer'>
        <p>Copyright @Bigbooster-2024</p>
      </div>
    </div>
  </div>
  </div>
);
}

export default TeacherPdf