import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Item from './item';
import './style.css';

const Student = () => {
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [sort, setSort] = useState("ASC");
    useEffect(() => {
        getData();
      }, [sort]);

    const getData = async () => {
        try {
            const opt = {method: "PUT", url: "https://learning-material-backend.onrender.com/all/pdf", headers: {"Content-Type": "application/json"}, data: {sort: sort}}
            const res = await axios(opt);
            const data = res.data;
            setList(data);
          }
          catch (error) {
            
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
  return (
    <div className='container'>
        <div className='studentCard'>
            <h1 className='sort'>Sort by Time</h1>
            <select value={sort} onChange={changeSort} className='select'>
                <option value="ASC" >Ascending</option>
                <option value="DESC">Descending</option>
            </select>
        </div>
        <ul className='list'>
            {list.map(each => <Item key={each.id} item={each} func={fileOpen} />)}
        </ul>
    </div>
  )
}

export default Student