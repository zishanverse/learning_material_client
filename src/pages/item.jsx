
import {useState} from 'react';
import {format} from 'date-fns';
import './style.css';

const Item = (props) => {
    const [link, setLink] = useState("");
    const {item, func} = props

    const getLink = async () => {
        const url = await func(item.filename);
        console.log(url);
        setLink(url);
    }
  return (
    <li key={item.id} className='item'>
                <p>{item.filename}</p>
                <p>{format(item.created_at, "dd-MM-yyyy")}</p>
                {link === "" ? <button type="button" className='btn' onClick={getLink}>Get</button> : <a className='btn' href={link}>Open</a> }
 
        </li>
  )
}

export default Item