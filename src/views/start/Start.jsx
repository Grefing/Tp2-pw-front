
import { useNavigate } from "react-router-dom";
import "./strart.css";


const Start = () => {
  const navigate = useNavigate();

  const handleClickGoToPage = () => {
    navigate('/students?')
  };

  return (
      <div className="pageContent">
        <div className="my-3">
          <h2 className="title">Página principal</h2>
        </div>

        <div className="containerModulo d-flex justify-content-center mx-5 my-4">
          <h1>
            <button onClick={handleClickGoToPage} className="linkModule text-center">
              Módulo Alumnos
            </button>
          </h1>
        </div>
      </div>  
  );
};

export default Start;
