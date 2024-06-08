import { Route, Routes} from "react-router-dom";
import Teacher from './pages/teacher.jsx';
import Home from './pages/home.jsx';
import Student from './pages/students.jsx';

const App = () => (
  <Routes>
    <Route exact path="/" element={<Home />} />
    <Route exact path="/teacher" element={<Teacher />} />
    <Route exact path="/student" element={<Student />} />
  </Routes>
)


export default App;
