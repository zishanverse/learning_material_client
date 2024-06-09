
import {useState} from 'react';
import {format} from 'date-fns';
import { ColorRing } from 'react-loader-spinner'
import '../pages/style.css';

const Item = (props) => {
    const [link, setLink] = useState("");
    const [status, setStatus] = useState("INITIAL");
    const {item, func} = props

    const getLink = async () => {
        setStatus("LOADING");
        const url = await func(item.filename);
        setStatus("SUCCESS");
        setLink(url);
    }

    const loading = () => (
    <div className='btn'>
    <ColorRing
      visible={true}
      height="40"
      width="40"
      ariaLabel="color-ring-loading"
      wrapperStyle={{}}
      wrapperClass="color-ring-wrapper"
      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
      </div>)

      const success = () => <a className='btn' href={link}>Open</a>

      const initial = () => <button type="button" className='btn' onClick={getLink}>Get</button>
      const failure = () => <button type="button" className='btn' onClick={getLink}>Retry</button>

      const render = () => {
        switch(status) {
          case "INITIAL":
            return initial();
          case "SUCCESS":
            return success();
          case "FAILURE":
            return failure();
          case "LOADING":
            return loading();
          default:
            return null;
        }
      }
  
      return (
    <li key={item.id} className='item'>
                <p>{item.filename}</p>
                <p>{format(item.created_at, "dd-MM-yyyy")}</p>
                <p>{item.tag_name}</p>
                {render()}
 
        </li>
  )
}

export default Item