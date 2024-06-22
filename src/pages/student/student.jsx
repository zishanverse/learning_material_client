import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import Carousel from "react-multi-carousel";
import { FallingLines } from 'react-loader-spinner';
import {format} from 'date-fns';
import axios from 'axios';
import { SiGoogleclassroom, SiCoinmarketcap } from "react-icons/si";
import { MdDownloading } from "react-icons/md";
import { FcOvertime, FcEmptyFilter } from "react-icons/fc";
import { RxLapTimer } from "react-icons/rx";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaAngleDoubleRight, FaFilePdf, FaSearch } from "react-icons/fa";
import { BsFilePdfFill } from "react-icons/bs";
import styled from 'styled-components';
import { IoMdTime } from "react-icons/io";
import { GiDuration } from "react-icons/gi";
import { FaTags } from "react-icons/fa6";
import { Calendar } from 'primereact/calendar';
import { SlCalender } from "react-icons/sl";
import { IoReloadCircle } from "react-icons/io5";
import Navbar from '../../components/navbar';
import "react-multi-carousel/lib/styles.css";
import './style.css';
import '../../components/style.css';
let initialList = [];


const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };


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
    background-color: ${props => props.active ? '#595959' : 'black'};
    padding: 10px;
    border: 0px;
    border-radius: 10px;
    width: 45%;
    color: ${props => props.active ? '#fff' : "#fff"};
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
const StudentWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    font-family: "Oswald", sans-serif;
    .spline {
        position: absolute;
        top: 0;
        right: 0;
        margin: 0;
        background-color: #000;
    }
`;
const ClassItem = styled.div`
    display: flex;
    align-items: center;
    width: 80%;
    padding: 20px;
    margin-right: 30px;
    margin-left: 30px;
    background-color: ${props => props.active ? "#000" : "#00000080"};
    border-radius: 20px;
    color: #ffffff;
    font-family: "Oswald", sans-serif;
    backdrop-filter: blur(10px);
    transition: 0.4s;

    &hover {
        background-color: #000;
    }
`


const Home = ({deviceType}) => {
    const navigate = useNavigate();
    const [date, setDate] = useState("all");
    const [todayActive, setTodayActive] = useState(false);
    const [yesterdayActive, setYesterdayActive] = useState(false);
    const [recent, setRecent] = useState(false);
    const [all, setAll] = useState(true);
    const [list, setList] = useState([]);
    const [sort, setSort] = useState(1);
    const [status, setStatus] = useState("INITIAL");
    const [searchValue, setSearchValue] = useState("");
    const [sub, setSub] = useState("");
    const [durationSearch, setDurationSearch] = useState(0);
    
    useEffect(() => {
        getData();
      }, [sort, date]);

    const getData = async () => {
        try {
            setStatus("LOADING");
            const opt = {method: "GET", url: `http://localhost:4000/all/pdf?sort=${sort}&date=${date}`}
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
    

    const fileOpen = async(name) => {
        const options = {
            method: "PUT",
            url: "https://learning-material-backend.onrender.com/getting/pdf/",
            headers: {"Content-Type" : "application/json"},
            data: {name: name.concat(".pdf")}
        }
        const res = await axios(options);
        //navigate(`${res.data}`, { replace: true });
        window.location.href = `${res.data}`;
        //return res.data;
    }
    const changeSort = (e) => {
        setSort(e.target.value);

    }

    const success = () => (
        <ul className='student-pdf-list-card'>
            {list.map(each => 
                <li className='student-pdf-list-item'>
                    <img className="pdf-image" src="https://static.vecteezy.com/system/resources/previews/022/361/832/original/3d-pdf-file-icon-illustration-png.png" alt='pdf'/>
                    <div className='student-pdf-item-content'>
                        <span className='student-pdf-item-name'>{each.filename} | {each.subject} </span>
                        {each.tags.map(eachTag => <span key={eachTag.id} className='student-pdf-item-span'>{`| ${eachTag.value} `}</span>)}
                        <br />
                        <div className="date-duration-mark">
                            <div className="student-pdf-flex">
                                <SiCoinmarketcap className="student-pdf-details-logo"/>:
                                {` ${each.marks} Marks`}
                            </div>
                            <div className="student-pdf-flex">
                                <FcOvertime className="student-pdf-details-logo"/>:
                                {` ${each.created_at}`}
                            </div>
                            <div className="student-pdf-flex">
                                <RxLapTimer className="student-pdf-details-logo"/>:
                                {` ${each.duration} min.`}
                            </div>
                        </div>
                    </div>
                    <MdDownloading className="download-logo" onClick={() => fileOpen(each.filename)}/>
                    <IoCheckmarkDoneSharp className="seen"/>
                    <p className="size">{each.size}MB</p>
                </li>
            )}
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
    const subjectChnage = (subName) => {
        const update = initialList.filter(each => each.subject == subName)
        setSub(subName)
        setList(update)
    }
    const DurationSearch = (dur) => {
        const update = initialList.filter(each => each.duration/60 <= dur && each.duration/60 > dur-1)
        setList(update)
        setDurationSearch(dur)
    }
     

  return (
    <>
    <StudentWrapper>
        
        <Spline
            scene="https://prod.spline.design/vCz3HJUOj6LLT4od/scene.splinecode" 
            />
        <Navbar />
        <div className='left-card'>
            <p className='select-date-para'>Select any date and download the PDF</p>
            <div className='caleder-card'>
                <input type="date" value={date} onChange={(e) => {if (e.target.value == null) {setDate(e.target.value)} else {setDate(new Date())} }} className="home-calender" />
                
            </div>
            <div className='today-yesterday'>
                <Button type="button" active={todayActive}  onClick={setToday}>Today</Button>
                <Button type="button" active={yesterdayActive}  onClick={setYesterday}>Yesterday</Button>
            </div>
            <button type="button" className='blue-btn' onClick={() => getData()}>Search Pdf files</button>     
        </div>
        <div className='right-card'>
            <h1 className='select-date-para'>Search pdf filter</h1>
            <label htmlFor="Name" className="student-pdf-filter-label">Search by Name</label>
            <div id="name" className='student-search-container'>
                <div className='search-logo-card'>
                    <FaSearch className='search-logo'/>    
                </div>
                <input type="search" value={searchValue} placeholder="Search pdf by name, tags, subjects..." className='student-pdf-search' onChange={techerPdfSearch}/>
            </div>
            <label htmlFor="duration" className="student-pdf-filter-label">Search by duration</label>
            <div id="name" className='student-search-container'>
                <div className='search-logo-card'>
                    <GiDuration className='search-logo'/>    
                </div>
                <select id="duration" value={durationSearch} onChange={e => DurationSearch(e.target.value)} className="student-pdf-search">
                    <option value={1}>{`<= 1 hour`}</option>
                    <option value={2}>{`<= 2 hours`}</option>
                    <option value={3}>{`<= 3 hours`}</option>
                </select> 
            </div>
             
        </div>
    </StudentWrapper>
    <div className='student-pdf-card'>
        <div className='student-section-name-card'>
            <h1 className='student-section-text'>Subject</h1>
            <SiGoogleclassroom className='section-logo'/>
        </div>
        <Carousel
            swipeable={false}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={false}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            deviceType={deviceType }
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style carousel-card"
            itemClass="carousel-item-padding-40-px"
  
            >
        <ClassItem active={sub === "Math"} onClick={() => subjectChnage("Math")}>
            <img className='class-item-img' src="https://cdn1.vectorstock.com/i/1000x1000/04/40/black-school-concept-with-maths-subject-vector-23060440.jpg" alt="mathematics" />
            <div className='class-item-content'>
                <h1 className='sub-name'>Mathematics</h1>
                <p className='sub-para'>The only way to learn Mathematics is to do mathematics.</p>
                <Link className='explore' to="/student/:mathematics">Explore
                    <FaAngleDoubleRight />
                </Link>
            </div>
        </ClassItem>

        <ClassItem active={sub === "Physics"} onClick={() => subjectChnage("Physics")}>
            <img className='class-item-img' src="https://tse1.mm.bing.net/th?id=OIP.JMgd683kfIrGHLH3DuabvAHaH5&pid=Api&P=0&h=180" alt="physics" />
            <div className='class-item-content'>
                <h1 className='sub-name'>Physics</h1>
                <p className='sub-para'>he physics is theoretical, but the fun is real.</p>
                <Link className='explore' to="/student/:science">Explore
                    <FaAngleDoubleRight />
                </Link>
            </div>
        </ClassItem>

        <ClassItem active={sub === "Biology"} onClick={() => subjectChnage("Biology")}>
            <img className='class-item-img' src="https://tse3.mm.bing.net/th?id=OIP.ZTFCn0YggScg8FxziJ57AgHaH_&pid=Api&P=0&h=180" alt="biology" />
            <div className='class-item-content'>
                <h1 className='sub-name'>Biology</h1>
                <p className='sub-para'>Biology is the Science, Evolution is the concept that makes biology unique.</p>
                <Link className='explore' to="/student/:science">Explore
                    <FaAngleDoubleRight />
                </Link>
            </div>
        </ClassItem>
        <ClassItem active={sub === "Chemistry"} onClick={() => subjectChnage("Chemistry")}>
            <img className='class-item-img' src="https://tse3.mm.bing.net/th?id=OIP.fNq0024ds9eDO4KnLvuIywHaGR&pid=Api&P=0&h=180" alt="chemistry" />
            <div className='class-item-content'>
                <h1 className='sub-name'>Chemistry</h1>
                <p className='sub-para'>Chemistry is good when you make love with it and it's bad when you make crack with it.</p>
                <Link className='explore' to="/student/:science">Explore
                    <FaAngleDoubleRight />
                </Link>
            </div>
        </ClassItem>

        <ClassItem active={sub === "English"} onClick={() => subjectChnage("English")}>
            <img className='class-item-img' src="https://tse1.mm.bing.net/th?id=OIP.C-7s6FBIJqcZJlL7zBTcvwHaH_&pid=Api&P=0&h=180" alt="english" />
            <div className='class-item-content'>
                <h1 className='sub-name'>English</h1>
                <p className='sub-para'>With language, you are at home anywhere.</p>
                <Link className='explore' to="/student/:english">Explore
                    <FaAngleDoubleRight />
                </Link>
            </div>
        </ClassItem>
        </Carousel>;

        <div className='student-section-name-card'>
            <h1 className='student-section-text'>Explore & Learn</h1>
            <BsFilePdfFill className='section-logo'/>
        </div>
        {render()}
    </div>
    </>
  )
}

export default Home