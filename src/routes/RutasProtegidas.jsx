import { Navigate } from "react-router-dom";

const RutasProtegidas = ({ children }) => {
  const usuarioLogueado = 
    JSON.parse(localStorage.getItem("administrator")) && 
    localStorage.getItem("jwtToken");

  if (!usuarioLogueado) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RutasProtegidas;
