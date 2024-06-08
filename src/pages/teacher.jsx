import {useState} from 'react';
import axios from 'axios';
import formData from 'form-data';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';


function Teacher() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [filename, setFilename] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('upload');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  

// Get your API key and secret from urlbox.com




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
        dateTime: new Date()
    }
      const options = {method: "PUT",url: 'https://learning-material-backend.onrender.com/upload/pdf/',headers: {"Content-Type": "application/json",'Access-Control-Allow-Origin': "*"} , data: fileData}
      
      const response = await axios(options);
      console.log(response.data);
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
      selectedFile(null);
    } catch (err) {
      console.error('Error converting PDF:', err.response.data);
      setError(err.response.data);
      setMsg("");
    }
    
  };

  

  return (
    <div className='flex'>
    <Sidebar />
    <div className='nav-content'>
      <Navbar />
      <div className="container">
          
        <div className='card'>
          <h1 className="head">Upload Learning Material For Your Students</h1>
          <label htmlFor='filename' className='label'>File Name</label>
          <input type="text" id="filename" className='select' onChange={(e) => setFilename(e.target.value)} />
          <input type="file" className='input' onChange={handleFileChange} />
          <button type="button" onClick={handleFileUpload} className='option'>{msg}</button>
          {error && <p className='failure'>{`*${error}`}</p>}
          {msg === "upload" ? null : <p className='success'>sucessfully uploaded</p>}
        </div>
      </div>
    </div>
    </div>
  );
}

export default Teacher;
