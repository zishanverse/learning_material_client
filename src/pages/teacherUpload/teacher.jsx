import {useState} from 'react';
import axios from 'axios';
import formData from 'form-data';
import {format} from 'date-fns';
import { ColorRing } from 'react-loader-spinner';
import {v4 as uuidv4} from 'uuid';
import { FaUpload } from "react-icons/fa";
import { IoMdCloseCircleOutline, IoMdAddCircle } from "react-icons/io";
import Sidebar from '../../components/sidebar';
import Navbar from '../../components/navbar';
import '../style.css';
import './style.css'



function Teacher() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState("INITIAL");
  const [filename, setFilename] = useState('');
  const [tag, setTag] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('upload');
  const [tags, setTags] = useState([]);
  
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  


  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    
    
    try {
      setStatus("LOADING");
      const file = filename.concat(".pdf");
      const fileData = {
        filename: file,
        contentType: "pdf",
        dateTime: format(new Date(), "dd-MM-yyy"),
        tags: tags,
        size: Math.round(selectedFile.size/1048576, 2)
      }
      console.log(fileData.size);
      const options = {method: "PUT",url: 'https://learning-material-backend.onrender.com/upload/pdf/',headers: {"Content-Type": "application/json",'Access-Control-Allow-Origin': "*"} , data: fileData}
      
      const response = await axios(options);
      const url = response.data;
      
      const option = {
        method: "PUT",
        url: url,
        headers: {"Content-Type": "application/pdf",'Access-Control-Allow-Origin': "*"},
        body: formData,
      }
      const res = await axios.put(url, formData, {headers: {"Content-Type": "multipart/form-data",'Access-Control-Allow-Origin': "*",'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'}});
      setError("");
      setMsg("uploaded");
      setFilename("");
      setTag("");
      setTags([]);
      setStatus("INITIAL");
      setSelectedFile(null);
      setStatus("SUCCESS");
    } catch (err) {
      console.error('Error converting PDF:', err.response.data);
      setError(err.response.data);
      setStatus("FAILURE");
      setMsg("");
    }
    
  };

  

  const addTag = (e) => {
      setTags([...tags, {id: uuidv4(), value: tag}]);
      setTag("");
    }
    
    const deleteTag = (id) => {
      const newList = tags.filter(each => each.id !== id);
      setTags(newList);
    }

    const loading = () => (
      <ColorRing
        visible={true}
        height="40"
        width="40"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />)

    const success = () => "File Uploaded"

      const initial = () => "Click here to submit"
      const failure = () => "Retry"

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
    <div className='flex'>
      <Navbar />
    <div className='side-content'>
      <Sidebar />
      <div className='content'>
        <div className="teacher-upload-container">
          <div className=''>
            <h1 className='welcome'>Welcome to teacher PDF upload...</h1>
            <div className='card'>
              <p className='upload-btn' >Upload your PDF here</p>
              <div>
                <label htmlFor='filename' className='label'>PDF Name</label>
                <input type="text" id="filename" value={filename} className='input-text' onChange={(e) => setFilename(e.target.value)} />
                <br />
                <br />
                <label className='label' id="des">PDF description</label>
                <textarea className='input-text'/>
                <br />
                <label className='label'>Upload PDF file</label>
                <div className='file-card'>
                  <label  htmlFor='file' className='file-upload-logo'> <FaUpload /> </label>  Upload your file 
                  <input type="file" id="file"  onChange={handleFileChange} />
                </div>

                <label htmlFor='tag' className='label'>Tags</label>
                <br />
                <div className='add-tag-input'>
                  {tags.map(each => <div key={each.id} className='tag'>
                      {each.value}
                      <IoMdCloseCircleOutline onClick={() => deleteTag(each.id)}/>
                  </div>)}
                <input type="text" id="tag" value={tag} className='tag-input'  onChange={e => setTag(e.target.value)} />
                <IoMdAddCircle className='add-btn' onClick={addTag}/>
                </div>
              </div>
              <button type="button" onClick={handleFileUpload} className='upload-btn width'>{render()}</button>
              {error && <p className='failure'>{`*${error}`}</p>}
              {msg === "upload" ? null : <p className='success'>sucessfully uploaded</p>}
            </div>
          </div>
        </div>
        <div className='footer'>
          <p>Copyright @Bigbooster-2024</p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Teacher;
