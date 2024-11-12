import { Link, NavLink, Outlet } from "react-router-dom";
import "./menu.css";

const Menu = () => {
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
              className={({ isActive }) => (isActive ? 'menu-selected container-fluid' : 'menu-unselected container-fluid') }
            >
              Inicio
            </NavLink>
            </div>
      
           <div className="d-flex align-self-end containerLink">
           <NavLink
              to={"/students"}
              className={({ isActive }) => (isActive ? 'menu-selected container-fluid' : 'menu-unselected container-fluid') }
            >
              Alumnos
            </NavLink>
           </div>
         
        </div>
      </div>

      <Outlet></Outlet>
    </section>
  );
};

export default Menu;
