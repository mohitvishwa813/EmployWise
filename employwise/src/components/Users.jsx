import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, deleteUser, logout } from "../utils/api";
import { FaEdit, FaTrash, FaSignOutAlt } from "react-icons/fa";

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  //  Logout Function (Clear LocalStorage + Redirect)
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  //  Delete User
  const handleDelete = (id) => {
    deleteUser(id);
    setUsers(users.filter((user) => user.id !== id)); 
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-4 flex justify-between">
        <h1 className="text-xl font-bold">EmployWise</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow-md rounded-lg p-4 text-center"
          >
            <img
              src={user.avatar}
              alt={user.first_name}
              className="w-12 h-12 rounded-full mx-auto"
            />
            <h3 className="font-medium">
              {user.first_name} {user.last_name}
            </h3>
            <p className="text-sm text-gray-500">{user.email}</p>
            <div className="flex justify-center mt-2">
              <button
                onClick={() => navigate(`/edit-user/${user.id}`)}
                className="text-blue-500 mx-2"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="text-red-500 mx-2"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
