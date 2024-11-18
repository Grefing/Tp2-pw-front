import { Button, Form, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import "./login.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const usuarioLocalStorage = JSON.parse(localStorage.getItem('usuario')) || {}
  



  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/admins/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log(response);

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        Swal.fire({
            icon: "success",
            title: `Bienvenido/a ${responseData.admin.username}`,
          });
        localStorage.setItem("administrator", JSON.stringify(responseData.admin));
        reset();
        navigate('/');
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Credenciales incorrectas!",
        });
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className="pageContent d-flex justify-content-center">
      <div className="containerRegistroForm align-self-start mt-5">
        <div>
          <h3 className="titleRegister">Iniciar sesión</h3>
          <div className="registerLine"></div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-2">
              <Form.Control
                placeholder="Ingrese su email"
                {...register("email", {
                  required: "El email es un dato obligatorio",
                  pattern: {
                    value:
                      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=? ^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a -z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                    message:
                      "El email debe tener el siguiente formato: mail@dominio.com",
                  },
                })}
                className={errors.email ? "input-error" : ""}
              />
              <Form.Text className="text-danger">
                {errors.email?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-2">
              <InputGroup>
                <Form.Control
                  type="password"
                  placeholder="Ingrese un password"
                  {...register("password", {
                    required: "El password es obligatorio",
                    pattern: {
                      value: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
                      message:
                        "El password debe tener en 8 y 16 caracteres, al menos un digito, al menos una minúscula y al menos una mayúscula. No puede tener otros simbolos",
                    },
                  })}
                  className={errors.password ? "input-error" : ""}
                />
              </InputGroup>

              <Form.Text className="text-danger">
                {errors.password?.message}
              </Form.Text>
            </Form.Group>
            <div className="row">
              <Button
                className="btn btn-dark btn-lg btn-block mb-2 btnRegister"
                type="submit"
              >
                Iniciar Sesión
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
