import axios from "axios";

const API_URL = "https://reqres.in/api";

const STORAGE_KEY = "users";
export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    return res.data; 
  } catch (error) {
    throw error.response?.data?.error || "Login failed";
  }
};

//  Get Users from API & Store in LocalStorage
export const getUsers = async () => {
  let users = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (!users) {
    const res = await fetch("https://reqres.in/api/users?page=1");
    const data = await res.json();
    users = data.data;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }
  return users;
};

//  Get Single User by ID
export const getUserById = async (id) => {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  return users.find((user) => user.id === Number(id));
};

//  Update User Data
export const updateUser = async (id, updatedData) => {
  let users = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  users = users.map((user) =>
    user.id === Number(id) ? { ...user, ...updatedData } : user
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

//  Delete User
export const deleteUser = async (id) => {
  let users = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  users = users.filter((user) => user.id !== Number(id));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

//  Logout (Clear LocalStorage)
export const logout = () => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem("token");
};
