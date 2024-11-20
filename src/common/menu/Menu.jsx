import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import "./menu.css";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Menu = () => {
 
  const adminLocalStorage = !!(
    JSON.parse(localStorage.getItem("administrator")) &&
    localStorage.getItem("jwtToken")
  );
  const [adminLogued, setAdminLogued] = useState(adminLocalStorage);
  const navigate = useNavigate();

 
  useEffect(() => {
    const isAdminLogued = !!(
      JSON.parse(localStorage.getItem("administrator")) &&
      localStorage.getItem("jwtToken")
    );
    setAdminLogued(isAdminLogued);
  }, [adminLocalStorage]);

  const closeSesion = () => {
    Swal.fire({
      title: "¿Desea cerrar sesión?",
      text: "Su sesión será cerrada",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("administrator");
        localStorage.removeItem("jwtToken");
        navigate("/login");

        Swal.fire({
          title: "Sesión cerrada!",
          text: "¡Hasta luego!",
          icon: "success",
        });
      }
    });
  };

  return (
    <section className="d-flex">
      <div className="selectMenu">
        <div className="d-flex justify-content-center">
          <h3 className="tpTitle">Trabajo Práctico 2</h3>
        </div>
        <div className="linksContainer d-flex flex-column">
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
