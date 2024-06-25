
import {useEffect, useState} from 'react';
import axios from 'axios';
import { FallingLines } from 'react-loader-spinner';
import { FaSearch } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import TeacherNavbar from '../../components/teacherNavbar';
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
        const opt = {method: "GET", url: `https://learning-material-backend.onrender.com/all/pdf/`, headers: {'Access-Control-Allow-Origin': "*",'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'}}
        const res = await axios(opt);
        const data = res.data;
        setList(data);
        initialList = data;
        setStatus("SUCCESS");
      }
      catch (error) {
        setStatus("FAILURE");
      }
  }

  const fileOpen = async(name) => {
    console.log(name.concat(".pdf"));
    const options = {
        method: "PUT",
        url: "https://learning-material-backend.onrender.com/getting/pdf/",
        headers: {"Content-Type" : "application/json"},
        data: {name: name.concat(".pdf")}
    }
    const res = await axios(options);
    window.location.href = `${res.data}`;
    return res.data;
    //navigate(`${res.data}`, { replace: true });
}
  const success = () => (
    <ul className='pdf-list-card'>
      {list.map(each => <TeacherPdfItem key={each.id} item={each} func={fileOpen} get={getData}/>)}   
    </ul>
);

const loading = () => (
  <div className='loader'>
    <FallingLines
        color="#fff"
        width="100"
        visible={true}
        ariaLabel="falling-circles-loading"
    />
    </div>
);

const failure = () => (
  <div className='loader'>
    <img className="failure" src='https://turbo360.com/wp-content/uploads/2023/05/azure-logic-app-failure-alert.png' alt="failure" />
    <h1>Failed, Please Try Again Later.</h1>
  </div>
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
      <div className='background'>
      <div className='flex'>
        <TeacherNavbar />
      <div className='side-content'>
        <Sidebar />
        <div className='content'>
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



