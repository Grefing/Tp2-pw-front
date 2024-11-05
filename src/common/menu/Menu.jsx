import { Link } from "react-router-dom";
import "./menu.css";

const Menu = () => {
  return (
    <div className="selectMenu">
      <div className="d-flex justify-content-center">
        <h3 className="tpTitle">Trabajo Practico 2</h3>
      </div>
      <div className="d-flex flex-column">
        <div
          className="d-flex align-self-end containerLink"
          id="inicioLinkContainer"
        >
          <Link
            to={"/"}
            className="my-3 selectLink container-fluid"
            id="inicioLink"
          >
            Inicio
          </Link>
        </div>
        <div
          className="d-flex align-self-end containerLink"
          id="alumnosLinkContainer"
        >
          <Link
            to={"/students-list"}
            className="my-3 selectLink container-fluid"
            id="alumnosLink"
          >
            Alumnos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;
