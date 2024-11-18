import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate} from "react-router-dom";
import Start from "./views/start/Start.jsx";
import StudentList from "./views/students/studentsList/StudentList.jsx";
import AddStudent from "./views/students/addStudent/AddStudent.jsx";
import Menu from "./common/menu/Menu.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./main.css";
import RutasProtegidas from "./routes/RutasProtegidas.jsx";
import Login from "./views/login/Login.jsx";

const isAuthenticated = () => !!localStorage.getItem("administrator");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu />, // Menu presente solo en estas rutas
    children: [
      { path: "/", element: <Start /> },
      {
        path: "/students",
        element: (
          <RutasProtegidas>
            <StudentList />
          </RutasProtegidas>
        ),
      },
      {
        path: "/add-student",
        element: (
          <RutasProtegidas>
            <AddStudent />
          </RutasProtegidas>
        ),
      },{
        path: "/login",
        element: isAuthenticated() ?  <Navigate to="/" /> : <Login />,
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
