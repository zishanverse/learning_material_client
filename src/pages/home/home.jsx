import {useEffect, useState} from 'react';
import axios from 'axios';
import { FallingLines } from 'react-loader-spinner';
import { MdDateRange } from "react-icons/md";
import { FaRegFileAlt,FaFilePdf,FaEye } from "react-icons/fa";
import styled from 'styled-components';
import { IoMdTime } from "react-icons/io";
import {format} from 'date-fns';
import { FaTags } from "react-icons/fa6";
import { Calendar } from 'primereact/calendar';
import { SlCalender } from "react-icons/sl";
import { FcEmptyFilter } from "react-icons/fc";
import { IoReloadCircle } from "react-icons/io5";
import './style.css';
import '../../components/style.css';
let initialList = [];


const HomeNavbar = () => (
    <div className='home-nav'>
        <div className='home-logo-card'>
            <FaFilePdf />
            <p>Bigbooster PDF Explore</p>
        </div>
        <div className='help-website'>
          <p>Help</p>
        
        <div className='reload-card'>
          <p className='nav-text'>website</p>
          <IoReloadCircle className='website-logo'/>
        </div>

      </div>
    </div>
)


const Button = styled.button`
    background-color: ${props => props.active ? '#595959' : 'yellow'};
    padding: 10px;
    border: 0px;
    border-radius: 10px;
    width: 45%;
    color: ${props => props.active ? '#fff' : "#323661"};
`;

const ButtonFilter = styled.button`
    color: ${props => props.active ? "#fff" : "#2F10F0"};
    background-color: ${props => props.active ? "#373737" : "#fff"};
    border:0px;
    border-radius: 15px;
    padding: 7px;
    width: 100px;
    box-shadow: 0px 0px 10px 1px solid #595959;
`;


const Home = () => {
    const [date, setDate] = useState(new Date());
    const [todayActive, setTodayActive] = useState(false);
    const [yesterdayActive, setYesterdayActive] = useState(false);
    const [recent, setRecent] = useState(true);
    const [all, setAll] = useState(false);
    const [list, setList] = useState([]);
    const [sort, setSort] = useState(1);
    const [status, setStatus] = useState("INITIAL");
    
    useEffect(() => {
        getData();
      }, [sort, date]);

    const getData = async () => {
        try {
            setStatus("LOADING");
            const opt = {method: "GET", url: `https://learning-material-backend.onrender.com/all/pdf?sort=${sort}&date=${date}`}
            const res = await axios(opt);
            const data = res.data;
            setList(data);
            if (date.length === 0) setStatus("EMPTY")
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
        //return res.data;
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
                            <button type="button" className='home-view-download-btn' onClick={() => fileOpen(each.filename)}>Download PDF</button>
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
        <div className='empty-container'>
        <FallingLines
            color="#a3c2c2"
            width="100"
            visible={true}
            ariaLabel="falling-circles-loading"
        />
        </div>
    );

    const failure = () => (
        <div className='empty-container'>
            <img className='failure' src='https://turbo360.com/wp-content/uploads/2023/05/azure-logic-app-failure-alert.png' alt="failure" />
            <h1>Failed</h1>
        </div>
    )

    const empty = () => (
        <div className='empty-container'>
            <FcEmptyFilter />
            <h1>Empty List</h1>
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
            case "EMPTY":
                return empty();
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
    const setToday = ()=> {
        setTodayActive(!todayActive);
        if (!todayActive) {setYesterdayActive(false);}
        setDate(new Date());
    }

    const setYesterday=  () => {
        const today = new Date();
        today.setDate(today.getDate() - 1);
        setYesterdayActive(!yesterdayActive);
        if (!yesterdayActive) {setTodayActive(false);}
        setDate(today);
    }
    const changeRecent = () => {
        setRecent(!recent);
        setAll(!all);
        if (!recent) {
            setDate(new Date());
        }
        else setDate("all");
    }

    const changeAll = () => {
        setAll(!all);
        setRecent(!recent);
        if (!all) {
            setDate("all");
        }
        else setDate(new Date());
        
    }
     

  return (
    <div className='home-container'>
        <HomeNavbar />
        <div className='home-content'>
            <h1 className='welcome-to-bigbooster'>Welcome to Bigbooster PDF downloding platform</h1>
            <div className='home-card'>
                <p className='select-date-para'>Select any date and download the PDF</p>
                <div className='caleder-card'>
                    <Calendar value={date} onChange={(e) => setDate(e.value)} className="home-calender" />
                    <SlCalender />
                </div>
                <div className='today-yesterday'>
                    <Button type="button" active={todayActive}  onClick={setToday}>Today</Button>
                    <Button type="button" active={yesterdayActive}  onClick={setYesterday}>Yesterday</Button>
                </div>
                <button type="button" className='blue-btn' onClick={() => getData()}>Search Pdf files</button>
                
                
            </div>
            <div className='home-bottom-card'>
                <div className='recent-all'>
                    <ButtonFilter type="button" active={recent} onClick={changeRecent} >Recent</ButtonFilter>
                    <ButtonFilter type="button" active={all} onClick={changeAll}>All PDF</ButtonFilter>
                </div>
                {render()}
            </div>
        </div>
    </div>
  )
}

export default Home