import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './StudentList.css';
import { Link } from 'react-router-dom';

const StudentList = () => {
  const [studentList, setStudentList] = useState(JSON.parse(localStorage.getItem("alumnos")) || []);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  console.log(studentList);
  

  useEffect(() => {
    localStorage.setItem("alumnos", JSON.stringify(studentList));
  }, [studentList]);

  const captureData = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredStudents = studentList.filter((student) =>
    student.lastName.toLowerCase().includes(searchText)
  );

  const deleteStudent = (index) => {
    Swal.fire({
      title: `Está seguro que desea eliminar el alumno?`,
      text: "Esta accion no es reversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Alumno eliminado!",
          text: "El alumno fue eliminado con éxito.",
          icon: "success",
        });
        const updatedList = studentList.filter((_, i) => i !== index);
        setStudentList(updatedList);
      }
    });
  };

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const studentsToShow = filteredStudents.slice(start, end);

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
    if (currentPage * itemsPerPage < filteredStudents.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

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
          <input
            type="text"
            className="inputSearch mx-2 form-control"
            placeholder="Buscar por apellido..."
            value={searchText}
            onChange={captureData}
          />
        </div>

        <div className="mx-2">
          <table className="table table-striped text-center">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Legajo</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {studentsToShow.map((student, index) => (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>{student.lastName}</td>
                  <td>{student.file}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteStudent(index + start)}
                    >
                      <i className="bi bi-x-lg"></i>
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
          <span>{currentPage}</span>
          <button onClick={goToNextPage} disabled={currentPage === totalPages}>»</button>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
