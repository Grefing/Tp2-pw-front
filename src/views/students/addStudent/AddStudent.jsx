import { Link, useNavigate } from "react-router-dom";
import "./addStudent.css";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import Menu from "../../../common/menu/Menu";
import Swal from "sweetalert2";

const AddStudent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const handleClickGoToPage = () => {
    navigate(-1);
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Alumno creado con éxito",
          showConfirmButton: false,
          timer: 1500
        });
        reset(); 
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "El alumno no se pudo crear!",
        });
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div className="pageContent">
      <div className="title d-flex justify-content-between my-3">
        <div>
          <h2>Alumnos</h2>
        </div>

        <div className="align-self-center backLinkContainer">
          <button onClick={handleClickGoToPage} className="backLink">
            Atras
          </button>
        </div>
      </div>

      <div className="formContainer my-5 mx-3">
        <Form onSubmit={handleSubmit(onSubmit)} className="mx-5">

          <div className="mb-3 ">
            <Form.Group className="d-flex justify-content-between">
              <label className="form-label me-3">Nombre:</label>
              <input
                type="text"
                className="inputForm"
                placeholder="Ingrese nombre..."
                {...register("firstname", { required: "El nombre es obligatorio" ,
                  maxLength: {
                    value: 100,
                    message: "La longitud máxima es de 100 caracteres"
                  },
                })}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Form.Text className="text-danger">
                {errors.firstname?.message}
              </Form.Text>
            </div>
          </div>

          <div className="mb-3">
            <Form.Group className="d-flex justify-content-between">
              <label className="form-label">Apellido:</label>
              <input
                type="text"
                className="inputForm"
                placeholder="Ingrese apellido..."
                {...register("lastname", { required: "El apellido es obligatorio",
                  maxLength: {
                    value: 100,
                    message: "La longitud máxima es de 100 caracteres"
                  },
                 })}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Form.Text className="text-danger">
                {errors.lastname?.message}
              </Form.Text>
            </div>
          </div>

          <div className="mb-3">
            <Form.Group className="d-flex justify-content-between">
              <label className="form-label">DNI:</label>
              <input
                type="number"
                className="inputForm"
                placeholder="Ingrese DNI..."
                {...register("dni", { required: "El DNI es obligatorio",
                  maxLength: {
                    value: 10,
                    message: "La longitud máxima es de 10 numeros"
                  },
                  pattern:{
                    value: /^[0-9]{1,10}$/,
                  }
                 })}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Form.Text className="text-danger">
                {errors.dni?.message}
              </Form.Text>
            </div>
          </div>

          <div className="mb-3">
            <Form.Group className="d-flex justify-content-between">
              <label className="form-label">Email:</label>
              <input
                type="text"
                className="inputForm"
                placeholder="Ingrese Email..."
                {...register("email", { required: "El Email es obligatorio",
                  maxLength: {
                    value: 100,
                    message: "La longitud máxima es de 100 caracteres"
                  },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Ingrese un formato de Email que sea correcto'
                  }
                 })}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Form.Text className="text-danger d-flex">
                {errors.email?.message}
              </Form.Text>
            </div>
          </div>

          <div>
            <button type="submit" className="sendBtn">
              Agregar
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddStudent;
