import { Link } from "react-router-dom";
import "./addStudent.css";
import { useForm } from "react-hook-form";
import { Form, FormGroup } from "react-bootstrap";

const AddStudent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="pageContent">
      <div className="title d-flex justify-content-between my-3">
        <div>
          <h2>Alumnos</h2>
        </div>

        <div className="align-self-center backLinkContainer">
          <Link to={"/students-list"} className="backLink">
            Atras
          </Link>
        </div>
      </div>

      <div className="formContainer my-5 mx-3">
        <Form onSubmit={handleSubmit(onSubmit)} className="mx-5">
          <div className="mb-3">
            <Form.Group className="d-flex justify-content-between">
              <label className="form-label me-3">Nombre:</label>
              <input
                type="text"
                className="inputForm"
                placeholder="Ingrese nombre..."
                {...register("name", { required: "El nombre es obligatorio" })}
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Form.Text className="text-danger">
                {errors.name?.message}
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
                {...register("lastName", {
                  required: "El apellido es obligatorio",
                })}
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Form.Text className="text-danger">
                {errors.lastName?.message}
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
                {...register("dni", { required: "El DNI es obligatorio" })}
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
                type="email"
                className="inputForm"
                placeholder="Ingrese Email..."
                {...register("email", { required: "El Email es obligatorio" })}
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
