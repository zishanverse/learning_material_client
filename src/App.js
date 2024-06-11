import { Route, Routes} from "react-router-dom";
import Teacher from './pages/teacherUpload/teacher.jsx';
import TeacherPdf from './pages/teacherFiles/index.jsx';
import Home from './pages/home/home.jsx';

const App = () => (
  <Routes>
    <Route exact path="/" element={<Home />} />
    <Route exact path="/techer/upload" element={<Teacher />} />
    <Route exact path="/teacher/all-pdfs" element={<TeacherPdf />} />
  </Routes>
)


export default App;
