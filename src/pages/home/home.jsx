import {useEffect, useState} from 'react';
import axios from 'axios';
import { FallingLines } from 'react-loader-spinner';
import { MdDateRange } from "react-icons/md";
import { FaRegFileAlt } from "react-icons/fa";
import Item from '../../components/item';
import { IoMdTime } from "react-icons/io";
import {format} from 'date-fns';
import { FaFilePdf,FaEye } from "react-icons/fa";
import { FaTags } from "react-icons/fa6";
import { Calendar } from 'primereact/calendar';
import { SlCalender } from "react-icons/sl";
import Navbar from '../../components/navbar';
import './style.css';

let initialList = [];

const Home = () => {
    const [date, setDate] = useState("");
    const [list, setList] = useState([]);
    const [sort, setSort] = useState(1);
    const [status, setStatus] = useState("INITIAL");
    
    useEffect(() => {
        getData();
      }, [sort]);

    const getData = async () => {
        try {
            setStatus("LOADING");
            const opt = {method: "GET", url: `https://learning-material-backend.onrender.com/all/pdf?sort=${sort}`, headers: {"Content-Type": "application/json"}, data: {sort: sort}}
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
        return res.data;
        //window.location.href = `${res.data}`;
        //navigate(`${res.data}`, { replace: true });
    }
    const changeSort = (e) => {
        setSort(e.target.value);

    }

    const success = () => (
        <ul className='home-pdfs-list'>
            {list.map(each => <li key={each.id} className='home-pdf-item'>
                <div className='item-flex'>
                    <div className='pdf-logo-card'>
                        <FaFilePdf />PDF
                    </div>

                    <div className='name-btns'>
                        <p>{each.filename}</p>
                        <div className='home-view-download'>
                            <button type="button" className='home-view-download-btn'>Download PDF</button>
                            <button type="button" className='home-view-download-btn'>
                                <FaEye />View
                            </button>
                        </div>
                    </div>
                    <div className='date-marks-time'>
                        <div >
                            <MdDateRange className='home-pdf-details-logo'/>{format(each.created_at, "dd-MM-yyyy")}
                        </div>
                        <div>
                            <FaRegFileAlt className='home-pdf-details-logo'/>200 Marks
                        </div>
                        <div >
                            <IoMdTime className='home-pdf-details-logo'/>60 Mins
                        </div>
                    </div>
                </div>
                    <div className='syllabus-tags'>
                        <p className='syllabus'>Syllabus</p>
                        <div className='line-between'></div>
                        <div className='home-pdf-tags'>
                            <FaTags />
                            <p>Tags: History</p>
                        </div>
                    </div>
            </li>)}
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
        <img className='failure' src='https://turbo360.com/wp-content/uploads/2023/05/azure-logic-app-failure-alert.png' alt="failure" />
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
    const changeFile = async (e) => {
        setStatus("LOADING");
        const newList = initialList.filter(each => each.filename.toLowerCase().includes(e.target.value.toLowerCase()));
        setList(newList);
        setStatus("SUCCESS");
    }
    const changeTag = async(e) => {
        setStatus("LOADING");
        const newList = initialList.filter(each => each.tag_name.toLowerCase().includes(e.target.value.toLowerCase()));
        console.log(newList);
        setList(newList);
        setStatus("SUCCESS");
        
    }
    const searchDate= (e) => {

    } 

  return (
    <div className='home-container'>
        <Navbar />
        <div className='home-content'>
            <h1 className='welcome-to-bigbooster'>Welcome to Bigbooster PDF downloding platform</h1>
            <div className='home-card'>
                <p className='select-date-para'>Select any date and download the PDF</p>
                <div className='caleder-card'>
                    <Calendar value={date} onChange={(e) => setDate(e.value)} className="home-calender" />
                    <SlCalender />
                </div>
                <div className='today-yesterday'>
                    <button type="button" className='yellow-btn'>Today</button>
                    <button type="button" className='yellow-btn'>Yesterday</button>
                </div>
                <button type="button" className='blue-btn'>Search Pdf files</button>
                
                
            </div>
            <div className='home-bottom-card'>
                <div className='recent-all'>
                    <button type="button" className='recent-btn'>Recent</button>
                    <button type="button" className='recent-btn all-btn'>All PDF</button>
                </div>
                {render()}
            </div>
        </div>
    </div>
  )
}

export default Home