import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../utils/api";

const EditProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    avatar: "",
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserById(id);
      if (data) setUser(data);
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(id, user);
    alert("Profile updated successfully!");
    navigate("/users");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold text-center">Edit Profile</h2>

        <div className="flex justify-center mb-4">
          <img
            src={user.avatar}
            alt="Profile"
            className="w-16 h-16 rounded-full border shadow-md"
          />
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={user.first_name}
            onChange={(e) => setUser({ ...user, first_name: e.target.value })}
            className="w-full mb-2 px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={user.last_name}
            onChange={(e) => setUser({ ...user, last_name: e.target.value })}
            className="w-full mb-2 px-4 py-2 border rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full mb-2 px-4 py-2 border rounded-lg"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
