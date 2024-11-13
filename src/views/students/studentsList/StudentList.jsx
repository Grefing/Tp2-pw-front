import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './StudentList.css';
import { Form, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { VscDebugRestart } from "react-icons/vsc";


const StudentList = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [studentList, setStudentList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    fetchData();         
  }, [searchText, currentPage, itemsPerPage]);

  const fetchData = async () => {
    const dataStudents = await fetchStudents(searchText, currentPage, itemsPerPage);
    setStudentList(dataStudents.rows); 
    setTotalStudents(dataStudents.count); 
  };

  const fetchStudents = async (search = '', currentPage = 1, pageSize = 5) => {
    try {
        const response = await fetch(`/api/students?search=${search}&currentPage=${currentPage}&pageSize=${pageSize}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching students:', error);
    }
  };
 
  const onSubmit = (data) =>{  
    setSearchText(data.searchText);
    reset();
  }

  const deleteStudent = async (id) => {
    Swal.fire({
      title: `¿Está seguro que desea eliminar al alumno?`,
      text: "¡Esta acción no es reversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`/api/students/${id}`, { method: 'DELETE' }); 
          if (response.ok) {
            Swal.fire({
              title: "¡Alumno eliminado!",
              text: "El alumno fue eliminado lógicamente con éxito.",
              icon: "success",
            });
            setStudentList(studentList.filter((student) => student.id !== id));
            console.log(studentList.filter((student) => student.id !== id));
            
          } else {
            Swal.fire("Error", "No se pudo eliminar el alumno", "error");
          }
        } catch (error) {
          console.error("Error al eliminar el alumno:", error);
          Swal.fire("Error", "Ocurrió un error al intentar eliminar el alumno", "error");
        }
      }
    });
  };
  
  const restartTable = () =>{
    setSearchText('');
  }
  
  const updateItemsPerPage = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage * itemsPerPage < totalStudents) {
      setCurrentPage(currentPage + 1);
    }
  };

  const totalPages = Math.ceil(totalStudents / itemsPerPage);

  return (
    <div className="pageContent">
      <div className="d-flex justify-content-between my-3 title">
        <div>
          <h2>Alumnos</h2>
        </div>
        <div className="align-self-center addLinkContainer">
          <Link to={"/add-student"} className="addLink">Agregar</Link>
        </div>
      </div>

      <div>
        <div className="d-flex justify-content-center inputContainer">
          
         <Form onSubmit={handleSubmit(onSubmit)} className='d-flex w-100 justify-content-center'>
         <button onClick={restartTable} className='btnRestart align-self-center'><VscDebugRestart /></button>
         <input
            type="text"
            className="inputSearch mx-2 form-control w-75 align-self-center"
            placeholder="Buscar por apellido..."
            {...register('searchText')}
          />
          <button type='submit' className='btnSearch'>Enviar</button>
         </Form>
        </div>

        <div className="mx-2">
          <table className="table table-striped text-center">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">DNI</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {studentList.map((student, index) => (
                <tr key={index}>
                  <td>{student.firstname}</td>
                  <td>{student.lastname}</td>
                  <td>{student.dni}</td>
                  <td>
                    <button
                      className="btnDelete"
                      onClick={() => deleteStudent(student.id)}
                    >
                      <i className="bi bi-x-lg">Borrar</i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="d-flex justify-content-end align-items-center">
        <div className="pagination mx-2">
          Ítems por página:
          <select value={itemsPerPage} onChange={updateItemsPerPage} className="mx-1">
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </div>
        <div className="mx-2">
          <button onClick={goToPrevPage} disabled={currentPage === 1}>«</button>
          <span>{currentPage} de {totalPages}</span>
          <button onClick={goToNextPage} disabled={currentPage === totalPages}>»</button>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
