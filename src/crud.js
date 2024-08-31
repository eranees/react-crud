import { useEffect, useState } from 'react';
import './App.css';
import { studentData } from './data';
import { Header } from './header';

function Crud() {

  const [data, setData] = useState([])
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [isUpdate, setUpdate] = useState(false);

  useEffect(() => {
    setData(studentData)
  }, [])

  function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete')) {
      const remainingStudents = data.filter((student) => student.id !== id);
      setData(remainingStudents)
    }
  }

  function handleSave(e) {
    e.preventDefault();
    let error = [];

    if (name === '') {
      error.push('Name is required');
    }
    if (gender === '') {
      error.push('Gender is required');
    }

    if (error.length > 0) {
      showToast(error.join(", "));
    } else {
      const newStudent = {
        id: data.length + 1,
        name: name,
        gender: gender,
      };
      const newStudentList = [...data, newStudent];
      setData(newStudentList);
      setName('');
      setGender('');
    }
  }

  function handleEdit(id) {
    setUpdate(true);
    const student = data.filter((std) => std.id === id);
    setId(student[0].id);
    setName(student[0].name);
    setGender(student[0].gender);
  }

  function handleUpdate(e) {
    e.preventDefault();
    let error = [];

    if (name === '') {
      error.push('Name is required');
    }
    if (gender === '') {
      error.push('Gender is required');
    }

    if (error.length > 0) {
      showToast(error.join(", "));
    } else {

      const updatedData = data.map((student) => {
        if (student.id === id) {
          return { ...student, name: name, gender: gender };
        }
        return student;

      });

      setData(updatedData);
      setName('')
      setGender('')
      setId(0)
      setUpdate(false);
    }
  }

  function showToast(message) {
    const toastElement = document.getElementById('errorToast');
    const toast = new window.bootstrap.Toast(toastElement);
    toastElement.querySelector('.toast-body').textContent = message;
    toast.show();
  }

  return (
    <>
      <Header />
      {/* Toast Element */}
      <div id="errorToast" className="bg-danger toast position-fixed top-0 end-0 p-3" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-header">
          <strong className="me-auto">Error</strong>
          <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div className="toast-body">
          {/* Error message will be inserted here */}
        </div>
      </div>
      <div className="App container d-flex justify-content-between">
        <div className='form'>
          <form>
            <input type="hidden" id="id" value={id} onChange={(e) => setId(e.target.value)} />
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} aria-describedby="name" />
            </div>

            <div className="mb-3">
              <label htmlFor="gender" className="form-label">Gender</label>
              <input type="text" className="form-control" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} aria-describedby="gender" />
            </div>
            {/* <select class="form-select" aria-label="Default select example">
              <option selected>Gender</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
            </select> */}
            {
              !isUpdate ?
                <button type="submit" className="btn btn-primary mt-2" onClick={(e) => handleSave(e)}>Save</button>
                :
                <button type="submit" className="btn btn-primary mt-2" onClick={(e) => handleUpdate(e)}>Update</button>
            }
          </form>
        </div>

        <div className='student-data w-50'>
          <table className='table table-hover'>
            <thead>
              <th>SNo.</th>
              <th>Id</th>
              <th>Name</th>
              <th>Gender</th>
            </thead>
            <tbody>
              {
                data.map((student, index) => {
                  return (
                    <tr key={index + 1}>
                      <td>{index + 1}</td>
                      <td>{student.id}</td>
                      <td>{student.name}</td>
                      <td>{student.gender}</td>
                      <td>
                        <button className='btn btn-sm bg-primary' onClick={() => handleEdit(student.id)}>Edit</button>
                        <button className='btn btn-sm bg-danger' onClick={() => handleDelete(student.id)}>Delete</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Crud;
