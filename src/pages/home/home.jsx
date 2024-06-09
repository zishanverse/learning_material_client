import {useEffect, useState} from 'react';
import axios from 'axios';
import { FallingLines } from 'react-loader-spinner'
import Item from '../../components/item';
import Sidebar from '../../components/sidebar';
import './style.css';

const Home = () => {
    const [list, setList] = useState([]);
    const [sort, setSort] = useState("ASC");
    const [status, setStatus] = useState("INITIAL");
    const [filename, setFilename] = useState("");
    const [tag, setTag] = useState("");
    useEffect(() => {
        getData();
      }, [sort]);

    const getData = async () => {
        try {
            setStatus("LOADING");
            const opt = {method: "PUT", url: "https://learning-material-backend.onrender.com/all/pdf", headers: {"Content-Type": "application/json"}, data: {sort: sort}}
            const res = await axios(opt);
            const data = res.data;
            setList(data);
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
        <ul className='list'>
            {list.map(each => <Item key={each.id} item={each} func={fileOpen} />)}
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
    <div className='home-container'>
        <Sidebar />
        <div>
            <div className='studentCard'>
                <div className='filter-card'>
                    <h1 className='sort'>Sort by Time</h1>
                    <select value={sort} onChange={changeSort} className='select'>
                        <option value="ASC" >Ascending</option>
                        <option value="DESC">Descending</option>
                    </select>
                </div>
            </div>

            {render()}
        </div>
    </div>
  )
}

export default Home