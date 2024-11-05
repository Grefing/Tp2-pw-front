import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Menu from './common/menu/Menu'
import Start from './views/start/Start';
import StudentList from './views/students/studentsList/StudentList'
import AddStudent from './views/students/addStudent/AddStudent';


function App() {
  return (
    <BrowserRouter>
      <div className="d-flex">
        <Menu />
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/students-list" element={<StudentList></StudentList>}></Route>
          <Route path='/add-student' element={<AddStudent></AddStudent>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App
