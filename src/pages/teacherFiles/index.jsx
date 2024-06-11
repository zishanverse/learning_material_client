import React from 'react';
import {useEffect, useState} from 'react';
import axios from 'axios';
import { FallingLines } from 'react-loader-spinner';
import { FaSearch } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import TeacherPdfItem from '../../components/teacherpdfitem';
import './style.css';



let initialList = [];

const TeacherPdf = () => {
  const [list, setList] = useState([]);
  const [sort, setSort] = useState(1);
  const [status, setStatus] = useState("INITIAL");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getData();
  }, [sort]);

const getData = async () => {
    try {
        setStatus("LOADING");
        const opt = {method: "GET", url: `https://learning-material-backend.onrender.com/all/pdf?sort=${sort}`, headers: {"Content-Type": "application/json",'Access-Control-Allow-Origin': "*",'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'}}
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
    <img className="failure" src='https://turbo360.com/wp-content/uploads/2023/05/azure-logic-app-failure-alert.png' alt="failure" />
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
const techerPdfSearch = (e) => {
  setSearchValue(e.target.value);
  const updateList = initialList.filter(each => {
    if (each.filename.includes(e.target.value)) return true;
    else {
      const list = each.tags.filter(each => each.value.includes(e.target.value));
      if (list.length !== 0) return true;
      else {return false;}
    }
  });
  setList(updateList);
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
            <input type="search" value={searchValue} placeholder="Search pdf by name, tags, subjects..." className='teacher-pdf-search' onChange={techerPdfSearch}/>
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