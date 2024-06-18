import { Route, Routes} from "react-router-dom";
import Teacher from './pages/teacherUpload/teacher.jsx';
import TeacherPdf from './pages/teacherFiles/index.jsx';
import Home from './pages/home/index.jsx';
import Student from './pages/student/student.jsx';
//import './App.css';

const App = () => (
  <Routes>
    <Route exact path="/" element={<Home />} />
    <Route exact path="/student" element={<Student />} />
    <Route exact path="/teacher/upload" element={<Teacher />} />
    <Route exact path="/teacher/all-pdfs" element={<TeacherPdf />} />
  </Routes>
)


export default App;
