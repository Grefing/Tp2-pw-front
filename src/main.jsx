import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Start from './views/start/Start.jsx'
import StudentList from './views/students/studentsList/StudentList.jsx'
import AddStudent from './views/students/addStudent/AddStudent.jsx'
import Menu from './common/menu/Menu.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import './main.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Menu/>,
    children: [
      {
        path:'/',
        element: <Start/>
      },
      {
        path: '/students',
        element: <StudentList/>
      },
      {
        path: '/add-student',
        element: <AddStudent/>
      }
    ]
  },

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
