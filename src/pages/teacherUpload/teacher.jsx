import {useState} from 'react';
import axios from 'axios';
import formData from 'form-data';
import { FaUpload } from "react-icons/fa";
import { IoMdCloseCircleOutline, IoMdAddCircle } from "react-icons/io";
import Sidebar from '../../components/sidebar';
import Navbar from '../../components/navbar';
import '../style.css';
import './style.css'

const COLORS = [
  "#e93a55", "#f94e45", "#ff8549", "#3e993c", "#1e8a78",
  "#238cd7", "#6d65a8", "#414a53", "#e36dab", "#4abeb7",
  "#ff8657", "#ffb855", "#84c15f", "#00bd9d", "#00b2d7",
  "#967cd7", "#a8b2bc", '#fb5779', '#ff7511', '#ffa800',
  '#ffd100', '#ace60f', '#19db7e', '#00d4c8', '#48dafd',
  '#008ce3', '#6457f9', '#9f46e4', '#ff78ff', '#ff4ba6'
]

function Teacher() {
  const [selectedFile, setSelectedFile] = useState(null);
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
      const file = filename.concat(".pdf");
      const fileData = {
        filename: file,
        contentType: "pdf",
        dateTime: new Date(),
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
      setSelectedFile(null);
    } catch (err) {
      console.error('Error converting PDF:', err.response.data);
      setError(err.response.data);
      setMsg("");
    }
    
  };

  

  const addTag = (e) => {
      setTags([...tags, {id: tags.length +1, value: tag}]);
      setTag("");
    }
    
    const deleteTag = (id) => {
      const newList = tags.filter(each => each.id !== id);
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
              <button type="button" onClick={handleFileUpload} className='upload-btn width'>Click here to submit</button>
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
