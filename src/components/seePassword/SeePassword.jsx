import { Button } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import './seePassword.css'

const SeePassword = ({ seePassword, setSeePassword }) => {
  return (
    <div>
      {seePassword ? (
        <Button className="btnSee" onClick={() => setSeePassword(false)}>
          <FaEye className="icon"/>
        </Button>
      ) : (
        <Button className="btnSee" onClick={() => setSeePassword(true)}>
          <FaEyeSlash className="icon"/>
        </Button>
      )}
    </div>
  );
};

export default SeePassword;
