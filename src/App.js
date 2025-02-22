import { useEffect, useState } from 'react';
import './App.css';
import { studentData } from './data';
import { Header } from './header';

function App() {
  const [data, setData] = useState([]);
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [isUpdate, setUpdate] = useState(false);

  useEffect(() => {
    setData(studentData);
  }, []);

  function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete?')) {
      const remainingStudents = data.filter((student) => student.id !== id);
      setData(remainingStudents);
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
    const student = data.find((std) => std.id === id);
    setId(student.id);
    setName(student.name);
    setGender(student.gender); // Ensure gender is set correctly here
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
      setName('');
      setGender('');
      setId(0);
      setUpdate(false);
    }
  }

  function showToast(message) {
    const toastElement = document.getElementById('errorToast');
    const toast = new window.bootstrap.Toast(toastElement);
    toastElement.querySelector('.toast-body').innerHTML = message;
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
        <div className="form">
          <form>
            <input type="hidden" id="id" value={id} onChange={(e) => setId(e.target.value)} />
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} aria-describedby="name" />
            </div>

            <div className="mb-3">
              <label htmlFor="gender" className="form-label">Gender</label>
              <select className="form-select" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} aria-describedby="gender">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {
              !isUpdate ?
                <button type="submit" className="btn btn-primary mt-2" onClick={(e) => handleSave(e)}>Save</button>
                :
                <button type="submit" className="btn btn-primary mt-2" onClick={(e) => handleUpdate(e)}>Update</button>
            }
          </form>
        </div>

        <div className="student-data w-50">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>SNo.</th>
                <th>Id</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((student, index) => (
                  <tr key={student.id}>
                    <td>{index + 1}</td>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.gender}</td>
                    <td>
                      <button className="btn btn-sm btn-primary" onClick={() => handleEdit(student.id)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(student.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
