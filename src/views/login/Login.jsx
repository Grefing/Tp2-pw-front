import { Button, Form, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./login.css";
import SeePassword from "../../components/seePassword/SeePassword";
import { RiArrowGoBackFill } from "react-icons/ri";

const Login = () => {
  const navigate = useNavigate(); 
  const [isRecoveringPassword, setIsRecoveringPassword] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [isPasswordResetting, setIsPasswordResetting] = useState(false); 
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleRecoverPassword = async () => {
    try {
      const response = await fetch("/api/admins/recovery-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Se ha enviado un código a tu correo electrónico.",
        });
        setIsVerifyingCode(true); // Muestra el campo para ingresar el código
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorData.message || "Error al enviar el código.",
        });
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al conectarse con el servidor.",
      });
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await fetch("/api/admins/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title:
            "Código verificado con éxito. Ahora puedes cambiar tu contraseña.",
        });
        console.log(setIsPasswordResetting);
        setIsVerifyingCode(false); // Ocultar la verificación del código
        setIsPasswordResetting(true); // Mostrar el formulario para restablecer la contraseña
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Código incorrecto",
          text: errorData.message || "El código ingresado no es válido.",
        });
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al conectarse con el servidor.",
      });
    }
  };

  const handlePasswordReset = async () => {
    try {
      const response = await fetch("/api/admins/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, newPassword }),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Contraseña actualizada con éxito.",
        });
        setIsPasswordResetting(false); // Ocultar el formulario de cambio de contraseña
        setIsRecoveringPassword(false);
        setIsVerifyingCode(false);
        reset(); // Resetear el formulario
        navigate("/login"); // Aquí es donde se usa navigate correctamente
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Error al actualizar la contraseña",
          text:
            errorData.message || "Hubo un problema al cambiar la contraseña.",
        });
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al conectarse con el servidor.",
      });
    }
  };

  const onSubmit = async (data) => {
    try {
        const response = await fetch("/api/admins/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const responseData = await response.json();
            Swal.fire({
                icon: "success",
                title: `Bienvenido/a ${responseData.admin.username}`,
            });
            reset();
            // Almacena el token en localStorage
            localStorage.setItem("jwtToken", responseData.token);
            localStorage.setItem(
                "administrator",
                JSON.stringify(responseData.admin)
            );
            navigate("/"); // Redirige a la página principal
        } else {
            const errorData = await response.json();
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: errorData.message || "Credenciales incorrectas!",
            });
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un problema al conectarse con el servidor.",
        });
    }
};


  return (
    <div className="pageContent d-flex justify-content-center">
      <div className="containerRegistroForm align-self-start mt-5">
        <div>
          <h3 className="titleRegister">Iniciar sesión</h3>
          <div className="registerLine"></div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {!isRecoveringPassword &&
              !isVerifyingCode &&
              !isPasswordResetting && (
                <>
                  <Form.Group className="mb-2">
                    <Form.Control
                      placeholder="Ingrese su email"
                      {...register("email", {
                        required: "El email es un dato obligatorio",
                        pattern: {
                          value:
                          /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/,
                          message:
                            "El email debe tener el siguiente formato: mail@dominio.com",
                        },
                      })}
                      className={errors.email ? "input-error" : ""}
                      onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    />
                    <Form.Text className="text-danger">
                      {errors.email?.message}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <InputGroup>
                      <Form.Control
                        type={seePassword ? "text" : "password"}
                        placeholder="Ingrese un password"
                        {...register("password", {
                          required: "El password es obligatorio",
                          pattern: {
                            value:
                              /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
                            message:
                              "El password debe tener entre 8 y 16 caracteres, al menos un digito, al menos una minúscula y al menos una mayúscula. No puede tener otros simbolos",
                          },
                        })}
                        className={errors.password ? "input-error" : ""}
                      />
                      <SeePassword
                        seePassword={seePassword}
                        setSeePassword={setSeePassword}
                      />
                    </InputGroup>

                    <Form.Text className="text-danger">
                      {errors.password?.message}
                    </Form.Text>
                  </Form.Group>
                  <div className="d-flex flex-column">
                    <Button
                      className="btn btn-dark btn-lg btn-block mb-2 btnRegister"
                      type="submit"
                    >
                      Iniciar Sesión
                    </Button>
                    <Button
                      variant="link"
                      onClick={() => setIsRecoveringPassword(true)}
                      className="btn btn-link"
                    >
                      ¿Olvidaste tu contraseña?
                    </Button>
                  </div>
                </>
              )}

            {isRecoveringPassword &&
              !isVerifyingCode &&
              !isPasswordResetting && (
                <>
                  <Form.Group className="mb-2">
                    <Form.Control
                      placeholder="Ingrese su email para recuperar contraseña"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    className="btn btn-dark btn-lg btn-block mb-2 btnRegister"
                    onClick={handleRecoverPassword}
                  >
                    Enviar código
                  </Button>
                </>
              )}

            {isVerifyingCode && !isPasswordResetting && (
              <>
                <Form.Group className="mb-2">
                  <Form.Control
                    placeholder="Ingrese el código de 6 dígitos"
                    type="text"
                    onChange={(e) => setCode(e.target.value)}
                    maxLength="6"
                  />
                </Form.Group>
                <Button
                  className="btn btn-dark btn-lg btn-block mb-2 btnRegister"
                  onClick={handleVerifyCode}
                >
                  Verificar código
                </Button>
              </>
            )}

            {isPasswordResetting && (
              <>
                <Form.Group className="mb-2">
                  <InputGroup>
                    <Form.Control
                      type={seePassword ? "text" : "password"}
                      placeholder="Ingrese su nueva contraseña"
                      onChange={(e) => setNewPassword(e.target.value)}
                      value={newPassword}
                      required
                    />
                    <SeePassword
                      seePassword={seePassword}
                      setSeePassword={setSeePassword}
                    />
                  </InputGroup>
                  <Form.Text className="text-muted">
                    La nueva contraseña debe tener entre 8 y 16 caracteres,
                    incluir al menos una letra mayúscula, una minúscula y un
                    número.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-2">
                  <InputGroup>
                    <Form.Control
                      type={seePassword ? "text" : "password"}
                      placeholder="Confirme su nueva contraseña"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                      required
                    />
                    <SeePassword
                      seePassword={seePassword}
                      setSeePassword={setSeePassword}
                    />
                  </InputGroup>
                  {confirmPassword && confirmPassword !== newPassword && (
                    <Form.Text className="text-danger">
                      Las contraseñas no coinciden.
                    </Form.Text>
                  )}
                </Form.Group>

                <Button
                  className="btn btn-dark btn-lg btn-block mb-2 btnRegister"
                  onClick={handlePasswordReset}
                  disabled={
                    newPassword !== confirmPassword || newPassword.length < 8
                  }
                >
                  Cambiar contraseña
                </Button>
              </>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
