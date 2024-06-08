import { Route, Routes} from "react-router-dom";
import Teacher from './pages/teacher.jsx';
import Home from './pages/home.jsx';

const App = () => (
  <Routes>
    <Route exact path="/" element={<Home />} />
    <Route exact path="/teacher" element={<Teacher />} />
  </Routes>
)


export default App;
