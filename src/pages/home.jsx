
import {useNavigate} from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
  return (
    <div className="container">
      <div className='card'>
        <h1 className='head'>Select your position</h1>
        <button className='option' onClick={() => navigate("/teacher")}>Teacher</button>
        <button className='option' onClick={() => navigate("/student")}>Student</button>
      </div>
    </div>
  );
}

export default Home;
