import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import "./menu.css";
import { useEffect, useState } from "react";

const Menu = () => {
  const adminLocalStorage = !!JSON.parse(localStorage.getItem("administrator"))
  const [adminLogued, setAdminLogued] = useState(adminLocalStorage);
  const navigate = useNavigate();

  useEffect(() => {
    setAdminLogued(adminLocalStorage)
  }, [adminLocalStorage])

  const closeSesion = () => {
    localStorage.removeItem("administrator");
    navigate('/login')
  };


  return (
    <section className="d-flex">
      <div className="selectMenu">
        <div className="d-flex justify-content-center">
          <h3 className="tpTitle">Trabajo Practico 2</h3>
        </div>
        <div className=" linksContainer d-flex flex-column">
          <div className="d-flex align-self-end containerLink">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "menu-selected container-fluid"
                  : "menu-unselected container-fluid"
              }
            >
              Inicio
            </NavLink>
          </div>

          <div className="d-flex align-self-end containerLink">
            <NavLink
              to={"/students"}
              className={({ isActive }) =>
                isActive
                  ? "menu-selected container-fluid"
                  : "menu-unselected container-fluid"
              }
            >
              Alumnos
            </NavLink>
          </div>

          {adminLogued && (
            <div className="d-flex justify-content-end mt-2 mx-1">
              <button className="btnCloseSesion" onClick={closeSesion}>
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>

      <Outlet></Outlet>
    </section>
  );
};

export default Menu;
