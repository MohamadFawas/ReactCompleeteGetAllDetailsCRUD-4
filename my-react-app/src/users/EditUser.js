import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: '',
    indexNumber: '',
    name: '',
    title: '',
  });
  const { id } = useParams();

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:9090/library/getId/${id}`);
      setUser(response.data.result.book);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const updateUser = async () => {
    try {
      await axios.put(`http://localhost:9090/library/update/${id}`, user);
      navigate('/');
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  const backHome = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1>Edit User</h1>
        <form>
          <div className="form-group">
            <label>ID</label>
            <input
              type="text"
              className="form-control"
              name="id"
              value={user.id}
              readOnly
            />
          </div>
          <div className="form-group">
            <label>Index Number</label>
            <input
              type="text"
              className="form-control"
              name="indexNumber"
              value={user.indexNumber}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={user.title}
              onChange={handleChange}
            />
          </div>
          <button type="button" className="btn btn-primary mr-2" onClick={updateUser}>
            Update User
          </button>
          <button type="button" className="btn btn-danger" onClick={backHome}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
